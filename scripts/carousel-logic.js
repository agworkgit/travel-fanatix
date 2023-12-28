$(document).ready(function () {
    // DOM elements
    var getAdviceBtn = $("#get-advice");
    var modalContent = $("#modal-content");
    var loadingModal = $("#loading-modal");
    var errorModal = $("#error-modal");
  
    // Function to create a card for each attraction
    function createCard(attraction) {
      var card = $("<div>").addClass("card text-bg-success mx-3 mb-3");
      var cardHeader = $("<div>")
        .addClass("card-header")
        .text("Ranking: " + attraction.ranking);
      var cardBody = $("<div>").addClass("card-body");
      var colDiv = $("<div>").addClass("col-md-12 col-lg-12");
      var title = $("<h5>").addClass("card-title").text(attraction.name);
      var isOpen = $("<h6>")
        .addClass("card-title")
        .text(attraction.is_closed ? "Closed" : "Open");
      var content = $("<p>").addClass("card-text").text(attraction.description);
      var img = $("<img>")
        .attr("src", attraction.photo.images.medium.url)
        .addClass("card-img-bottom mb-3")
        .css({
          "object-fit": "cover",
          "object-position": "center",
          height: "15vh", // Set default height
          width: "100%", // Maintain full width
          "border-radius": "5px",
        })
        .attr("alt", "Attraction Image");
  
      // Create an input group for the "Book Visit" link, time input, and "Save to Planner" button
      var inputGroup = $("<div>").addClass("input-group mb-3");
  
      // "Book Visit" link
      var websiteLink = $("<a>")
        .addClass("booking-link btn btn-secondary")
        .attr("href", attraction.website)
        .attr("target", "_blank")
        .text("Book Visit");
  
      // Time input
      var timeInput2 = $("<input>")
        .addClass("form-control time-input")
        .attr("placeholder", "When will you visit?")
        .attr("aria-label", "When will you visit?")
        .attr("aria-describedby", "button-addon2");
  
      // "Save to Planner" button
      var saveButton2 = $("<button>")
        .addClass("btn primary-btn saveButton")
        .attr("type", "button")
        .attr("id", "button-addon2")
        .text("Save to Planner");
  
      saveButton2.on("click", function () {
        var time = timeInput2.val().trim();
        var locationTitle = title.text();
        console.log(time);
        console.log(locationTitle);
  
        $("#time-input").val(time);
        $("#activity-input").val(locationTitle);
        $("#add-activity").trigger("click");
      });
  
      inputGroup.append(websiteLink, timeInput2, saveButton2);
  
      colDiv.append(img);
      cardBody.append(colDiv, title, isOpen, content, inputGroup);
      card.append(cardHeader, cardBody);
  
      return card;
    }
  
    // Function to show the loading modal
    function showLoadingModal() {
      loadingModal.modal("show");
    }
  
    // Function to hide the loading modal
    function hideLoadingModal() {
      loadingModal.modal("hide");
    }
  
    // Function to show an error modal with a specific message
    function showErrorModal(message) {
      $("#error-message").text(message);
      errorModal.modal("show");
    }
  
    // Function to handle the API response and update the modal content
    function handleApiResponse(POIdata) {
      hideLoadingModal();
  
      modalContent.empty();
      if (POIdata.results && POIdata.results.data) {
        var sortedAttractions = POIdata.results.data.sort(
          function (a, b) {
            return a.ranking - b.ranking;
          }
        );
        sortedAttractions.slice(0, 5).forEach(function (attraction) {
          var card = createCard(attraction);
          modalContent.append(card);
        });
        $("#recModal").modal("show");
      } else {
        showErrorModal("No data available for the selected city.");
      }
    }
  
    // Function to fetch attractions based on the city search
    function getAttractions(citySearch) {
      showLoadingModal();
  
      var locationCodeurl = "https://tourist-attraction.p.rapidapi.com/typeahead";
      var locationCodeoptions = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": "bc2527c02cmsh27f61ab601589f4p155766jsnc49af9f0be56",
          "X-RapidAPI-Host": "tourist-attraction.p.rapidapi.com",
        },
        body: new URLSearchParams({
          q: citySearch,
          language: "en_US",
        }),
      };
  
      fetch(locationCodeurl, locationCodeoptions)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.results && data.results.data && data.results.data.length > 0) {
            var locationCode = data.results.data[0].result_object.location_id;
  
            var url = "https://tourist-attraction.p.rapidapi.com/search";
            var options = {
              method: "POST",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key": "bc2527c02cmsh27f61ab601589f4p155766jsnc49af9f0be56",
                "X-RapidAPI-Host": "tourist-attraction.p.rapidapi.com",
              },
              body: new URLSearchParams({
                location_id: locationCode,
                language: "en_UK",
                currency: "GBP",
                offset: "0",
              }),
            };
  
            return fetch(url, options);
          } else {
            hideLoadingModal();
            showErrorModal("City not found. Please check your spelling.");
            throw new Error("City not found");
          }
        })
        .then(function (response) {
          return response.json();
        })
        .then(handleApiResponse)
        .catch(function (error) {
          console.error("Error fetching API data:", error);
        });
    }
  
    // Event listener for the "Get Advice" button
    getAdviceBtn.on("click", function () {
      var citySearch = $("#cityInput").val().trim();
  
      if (!citySearch) {
        showErrorModal("Please enter a city before getting advice.");
        return;
      }
  
      getAttractions(citySearch);
    });
  });
  