// Function to update the time using Day.js
$(document).ready(function () {

  // manually controlling the slide
  var currentSlide = 0;

  // Function to update the time display
  function updateTime() {
    var currentTime = dayjs().format("HH:mm");
    $(".nav-time").text(currentTime);
  }

  // Update the time initially
  updateTime();

  // Update the time every second
  setInterval(updateTime, 1000);

  // Update the "Day" element with the current day
  const currentTime = dayjs();
  const dayElement = $('.card-title[data-update="day"]');
  dayElement.text(currentTime.format("dddd"));

  // Checklist functions
  $(document).ready(function () {
    // Load data from localStorage when the page loads
    loadFromLocalStorage();

    // Event listener for the Add button
    $("#add-activity").on("click", function () {
      // Get values from input fields
      var time = $("#time-input").val();
      var activity = $("#activity-input").val();

      // Check if both fields are filled
      if (time && activity) {
        // Show checklist output if it's hidden
        $("#checklist-output-container").show();

        // Save data to localStorage
        saveToLocalStorage(time, activity);

        // Render the new checklist entry
        renderChecklistEntry(time, activity);

        // Clear input fields
        $("#time-input, #activity-input").val("");
      } else {
        // Display an alert if fields are not filled
        searchBtnModal.modal("show");
      }
    });

    // Event listener for clearing checklist output
    $("#checklist").on("change", ".form-check-input", function () {
      if ($(this).prop("checked")) {
        // Remove the checklist output if the checkbox is checked
        var entryToRemove = $(this).closest(".input-group");
        entryToRemove.remove();

        // Get the corresponding time and activity values
        var time = entryToRemove.find(".input-group-text:last").text();
        var activity = entryToRemove.find(".form-control").val();

        // Remove the corresponding data from localStorage
        removeFromLocalStorage(time, activity);
      }
    });

    // Function to save data to localStorage
    function saveToLocalStorage(time, activity) {
      var checklistData =
        JSON.parse(localStorage.getItem("checklistData")) || [];
      checklistData.push({ time: time, activity: activity });
      localStorage.setItem("checklistData", JSON.stringify(checklistData));
    }

    // Function to remove data from localStorage
    function removeFromLocalStorage(time, activity) {
      var checklistData =
        JSON.parse(localStorage.getItem("checklistData")) || [];

      // Find the index of the entry to remove
      var indexToRemove = checklistData.findIndex(
        (item) => item.time === time && item.activity === activity
      );

      // Remove the entry if found
      if (indexToRemove !== -1) {
        checklistData.splice(indexToRemove, 1);
        localStorage.setItem("checklistData", JSON.stringify(checklistData));
      }
    }

    // Function to load data from localStorage
    function loadFromLocalStorage() {
      var checklistData =
        JSON.parse(localStorage.getItem("checklistData")) || [];

      // Iterate through the checklistData and render the entries
      checklistData.forEach((item) =>
        renderChecklistEntry(item.time, item.activity)
      );
    }

    // Function to render a checklist entry
    function renderChecklistEntry(time, activity) {
      // Create a new checklist output
      var newChecklist = $(`
        <div class="input-group pt-3">
          <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
          </div>
          <input class="form-control" type="text" value="${activity}" aria-label="Text input with checkbox">
          <span class="input-group-text">${time}</span>
        </div>
      `);

      // Display the new checklist output
      newChecklist.prependTo("#checklist-output-container");
    }
  });

  // Modal
  document.addEventListener("DOMContentLoaded", function () {
    // Get references to the recommendation sections
    var initRecommendations = document.getElementById("recommendations-init");
    var recommendationGroup = document.getElementById("recommendation-group");

    // Get reference to the modal recommendation button
    var modalRecBtn = document.getElementById("modal-rec-btn");

    // Get reference to the modal element
    var recModalElement = document.getElementById("recModal");
    var recModal = new bootstrap.Modal(recModalElement);

    // Add a click event listener to the modal recommendation button
    modalRecBtn.addEventListener("click", function () {
      // Hide the initial recommendations section
      initRecommendations.style.display = "none";

      // Show the filled recommendations section
      recommendationGroup.style.display = "block";

      // Hide the modal backdrop
      recModal.hide();
    });
  });

  // Weather API
  const apiKey = "4d7081df4ecfa66c38a6adb2ad1b0ebd";
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");
  const iconElement = document.getElementById("weather-icon");
  const locationElement = $("#location");

  function updateWeatherData(latitude, longitude, cityInput) {
    let locationQuery;

    if (cityInput) {
      locationQuery = "q=" + encodeURIComponent(cityInput);
    } else {
      locationQuery = "lat=" + latitude + "&lon=" + longitude;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&appid=${apiKey}&units=metric`;

    // Make a request to the OpenWeather API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update HTML content with the received data
        console.log(data); // Add this line to log the data to the console for debugging

        temperatureElement.innerHTML = `Temperature: ${data.main.temp} °C`;
        humidityElement.innerHTML = `Humidity: ${data.main.humidity}%`;
        windElement.innerHTML = `Wind: ${data.wind.speed} m/s`;

        // Update with custom icons
        const weatherIconCode = data.weather[0].icon;
        const partialFileName = getCustomIconFileName(weatherIconCode);
        const customIconPath = `./resources/weather-conditions/${partialFileName}.svg`;
        iconElement.src = customIconPath;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Get user's geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Use the user-inputted city if available
        const cityInput = $("#cityInput").val();
        updateWeatherData(latitude, longitude, cityInput);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

  // Listen for changes in the input field
  const searchBtnModal = $(".searchBtnModal");
  const closeSearchBtnModal = $(".closeSearchBtnModal");
  const searchBtn = $(".searchBtn");

  // Search button click function
  searchBtn.on("click", function () {
    const cityInput = $("#cityInput").val();

    if (cityInput === "") {
      searchBtnModal.modal("show");
    } else {
      const locationQuery = cityInput
        ? `q=${cityInput}`
        : `lat=${latitude}&lon=${longitude}`;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.cod === "404") {
            searchBtnModal.modal("show");
          } else {
            temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
            humidityElement.innerHTML = `Humidity: ${data.main.humidity}%`;
            windElement.innerHTML = `Wind: ${data.wind.speed} m/s`;
            locationElement.text(data.name);

            const weatherIconCode = data.weather[0].icon;
            const partialFileName = getCustomIconFileName(weatherIconCode);
            const customIconPath = `./resources/weather-conditions/${partialFileName}.svg`;
            iconElement.src = customIconPath;
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  });

  // On click function for close search button modal
  closeSearchBtnModal.on("click", function () {
    searchBtnModal.modal("hide");
  });

  // Function to get the custom icon file name based on OpenWeatherMap icon codes
  function getCustomIconFileName(iconCode) {
    const iconFileMap = {
      "01d": "sunny",
      "01n": "clear_night",
      "02d": "partly_cloudy_day",
      "02n": "partly_cloudy_night",
      "03d": "cloudy",
      "03n": "cloudy",
      "04d": "cloudy",
      "04n": "cloudy",
      "09d": "rainy",
      "09n": "rainy",
      "10d": "rainy_heavy",
      "10n": "rainy_heavy",
      "11d": "thunderstorm",
      "11n": "thunderstorm",
      "13d": "snowing",
      "13n": "snowing",
      "50d": "foggy",
      "50n": "foggy",
    };

    const partialFileName = iconFileMap[iconCode] || "generic";
    const fullFileName = `${partialFileName}_FILL0_wght400_GRAD0_opsz24`;

    return fullFileName;
  }

  // Tourist Attraction API

  // Unsplash API
  $(document).ready(function () {
    // Intercept form submission
    $("#citySearchForm").submit(function (event) {
      event.preventDefault();

      // Get the user's input
      const cityInput = $("#cityInput").val();

      // Call Unsplash API to get an image based on the city
      const apiKey = "ly9fjoF8yY1ZeUT8mXX2eyXoAh4EVKPy4FrdUl8sh4E";
      fetch(
        `https://api.unsplash.com/photos/random?query=${cityInput}&orientation=landscape&client_id=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Update the hero image with the Unsplash image
          const imageUrl = data.urls.regular;
          $("#hero .card-img").attr("src", imageUrl);
        })
        .catch((error) =>
          console.error("Error fetching Unsplash image:", error)
        );
    });
  });

  // Theme Update
  $(document).ready(function () {
    // Function to update the theme based on the time
    function updateTheme() {
      const currentHour = dayjs().hour();

      // You can adjust the time ranges according to your needs
      const isDayTime = currentHour >= 8 && currentHour < 16;

      // Update the theme class based on the time
      if (isDayTime) {
        $("body").removeClass("dark-theme").addClass("light-theme");
        $(".day-icon").removeClass("hidden");
        $(".nite-icon").addClass("hidden");
        $(".footer-border").addClass("day-border");
      } else {
        $("body").removeClass("light-theme").addClass("dark-theme");
        $(".nite-icon").removeClass("hidden");
        $(".day-icon").addClass("hidden");
        $(".footer-border").removeClass("day-border");
      }
    }

    function updateTime() {
      var currentTime = dayjs().format("HH:mm");
      $(".nav-time").text(currentTime);

      // Call the function to update the theme based on the time
      updateTheme();
    }

    // Update the time initially
    updateTime();

    // Update the time every second
    setInterval(updateTime, 1000);

    // Update the "Day" element with the current day
    const currentTime = dayjs();
    const dayElement = $('.card-title[data-update="day"]');
    dayElement.text(currentTime.format("dddd"));

    // Your existing checklist functions, modal, weather API, Unsplash API, and other code

    // Call the function to update the theme on page load
    updateTheme();
  });

  // Function to update the location on the web page
  function updateLocation() {
    // Your unique token for accessing the ipinfo.io API
    const tokenKey = "a3e863769c5a7c";

    // Construct the API endpoint URL with the token
    const apiUrl = `https://ipinfo.io?token=${tokenKey}`;

    // Make a request to the ipinfo.io API using the fetch function
    fetch(apiUrl)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Extract the city information from the API response
        const city = data.city;

        // Find the HTML element with the ID 'location'
        const locationElement = document.getElementById("location");

        // Update the text content of the 'location' element with the city name
        locationElement.innerText = city;
      })
      .catch((error) => {
        // Handle errors by logging a message to the console
        console.error("Error fetching location:", error);
      });
  }

  // Call the function to update location on page load
  updateLocation();
});

