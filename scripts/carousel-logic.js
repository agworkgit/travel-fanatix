$(document).ready(function () {
    const getAdviceBtn = $("#get-advice");
    const modalContent = $("#modal-content");

	function createCard(attraction) {
		const card = $("<div>").addClass("card text-bg-success mx-3 mb-3");
		const cardHeader = $("<div>").addClass("card-header").text("Ranking: " + attraction.ranking);
		const cardBody = $("<div>").addClass("card-body");
		const colDiv = $("<div>").addClass("col-md-4");
		const title = $("<h5>").addClass("card-title").text(attraction.name);
		const isOpen = $("<h6>").addClass("card-title").text(attraction.is_closed ? "Closed" : "Open");
		const content = $("<p>").addClass("card-text").text(attraction.description);
		const img = $("<img>").attr("src", attraction.photo.images.medium.url)
			.addClass("card-img-bottom")
			.css({
				"object-fit": "cover",
				"object-position": "center",
				"height": "10vh", // Set default height
				"width": "100%", // Maintain full width
				"border-radius": "5px"
			})
			.attr("alt", "Attraction Image");
	
		// Create a link for the website
		const websiteLink = $("<a>").attr("href", attraction.website).attr("target", "_blank").text("Visit Website");
        
        const timeInput2 = $('<input>');
		timeInput2.addClass('time-input');
		timeInput2.attr('placeholder', '13:00');

        const saveButton2 = $('<button>');
		saveButton2.addClass('btn primary-btn saveButton');
		saveButton2.text('Save to Planner');

        saveButton2.on('click', function () {

            const time = timeInput2.val().trim();
            const locationTitle = title.text();
            console.log(time);
            console.log(locationTitle);

            $('#time-input').val(time);
			$('#activity-input').val(locationTitle);
			$('#add-activity').trigger('click');

        });
	
		colDiv.append(img);
		cardBody.append(colDiv, title, isOpen, content, websiteLink, timeInput2, saveButton2);
		card.append(cardHeader, cardBody);
	
		return card;
	}
	

    function handleApiResponse(POIdata) {
        modalContent.empty();

        // Sort attractions by TripAdvisor ranking
        const sortedAttractions = POIdata.results.data.sort((a, b) => a.ranking - b.ranking);

        // Display cards for each attraction
        sortedAttractions.slice(0, 5).forEach(attraction => {
            const card = createCard(attraction);
            modalContent.append(card);
        });

        $("#recModal").modal("show");
    }

    getAdviceBtn.on("click", function () {
        const citySearch = $("#cityInput").val().trim();
        if (!citySearch) {
            alert("Please enter a city before getting advice.");
            return;
        }

        const locationCodeurl =
            "https://tourist-attraction.p.rapidapi.com/typeahead";
        const locationCodeoptions = {
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
                var locationCode = data.results.data[0].result_object.location_id;

                const url = "https://tourist-attraction.p.rapidapi.com/search";
                const options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        "X-RapidAPI-Key":
                            "bc2527c02cmsh27f61ab601589f4p155766jsnc49af9f0be56",
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
            })
            .then(function (response) {
                return response.json();
            })
            .then(handleApiResponse)
            .catch(function (error) {
                console.error("Error fetching API data:", error);
            });
    });
});

