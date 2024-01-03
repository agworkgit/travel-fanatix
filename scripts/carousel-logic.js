$(document).ready(function () {
    // DOM elements
    var getAdviceBtn = $("#get-advice");
    var modalContent = $("#modal-content");
    var loadingModal = $("#loading-modal");
    var errorModal = $("#error-modal");
    var carouselInner = $(".carousel-inner");
  
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

        let randomAttractions = sortedAttractions.sort(() => .5 - Math.random()).slice(0,5)
        randomAttractions.forEach(function (attraction, index) {
        //   var card = createCard(attraction);
        var card = carouselItem(attraction, index);
        //   modalContent.append(card);
        carouselInner.append(card);
        });
        $("#recModal").modal("show");
      } else {
        showErrorModal("No data available for the selected city.");
      }
    }

    function carouselItem(attraction, index) {
        var card = $("<div>").addClass("card text-bg-success mx-3 mb-3");
        var cardHeader = $("<div>")
          .addClass("card-header")
          .text("Ranking: " + attraction.ranking);
        var cardBody = $("<div>").addClass("card-body carousel-box");
        var colDiv = $("<div>").addClass("col-md-12 col-lg-12");
        var title = $("<h5>").addClass("card-title attraction-name").text(attraction.name);
        var content = $("<p>").addClass("card-text").text(attraction.description);
        var carouselImg = $("<img>")
        .addClass("d-block w-100 carousel-image")
        .attr("src", attraction.photo.images.medium.url)
        .css({
          "object-fit": "cover",
          "object-position": "center",
          height: "25vh",
          width: "100%", 
          "border-radius": "5px",
        })
        .attr("alt", "Attraction Image");
        var carItemEl = $("<div>").addClass("carousel-item")
        if(index === 0){
            carItemEl.addClass("active")
        }

        var inputGroup = $("<div>").addClass("input-group mb-3");
  
      // "Book Visit" link
      var websiteLink = $("<a>")
        .addClass("booking-link btn btn-secondary")
        .attr("href", attraction.website)
        .attr("target", "_blank")
        .text("URL");
  
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
        .text("Save");
  
      saveButton2.on("click", function () {
        var time = timeInput2.val().trim();
        var locationTitle = title.text();
        //clear time input
        timeInput2.val("");
        //alert event saved to planner
        timeInput2.attr("placeholder", "Saved");
        //console logs for time and location
        console.log(time);
        console.log(locationTitle);
  
        $("#time-input").val(time);
        $("#activity-input").val(locationTitle);
        $("#add-activity").trigger("click");
      });
  
        inputGroup.append(websiteLink, timeInput2, saveButton2);

        colDiv.append(carouselImg);
        cardBody.append(colDiv, title, content, inputGroup);
        card.append(cardHeader, cardBody)
        carItemEl.append(card);

        return carItemEl
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
  
      if (citySearch === "") {
        citySearch = $('#location').text();
      }
      console.log(citySearch);
      carouselInner.empty();
      getAttractions(citySearch);
    });
  });
  