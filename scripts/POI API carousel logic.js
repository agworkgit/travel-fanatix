const submitBtn = $('#search-button')
const cardBox = $('#cardbox')
const modalContent = $('#modal-content')
const carouselContent = $('#carousel-inner')
const loading = $('#loading')
const overlay = $('#overlay')


submitBtn.on('click', function(event) {
	event.preventDefault();

	const citySearch = $('#search-input').val().trim();

	$('#overlayText').empty()
	var transportCity = $('<h5>')
	transportCity.text('Transporting you to ' + citySearch + '. One moment...')
	$('#overlayText').append(transportCity)
	overlay.removeClass('hidden')

	setTimeout(() => {
	overlay.addClass('hidden')
	}, 5000);

	const locationCodeurl = 'https://tourist-attraction.p.rapidapi.com/typeahead';
	const locationCodeoptions = {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'X-RapidAPI-Key': 'bc2527c02cmsh27f61ab601589f4p155766jsnc49af9f0be56',
			'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com'
		},
		body: new URLSearchParams({
			q: citySearch,
			language: 'en_US'
		})
	};

	fetch(locationCodeurl, locationCodeoptions)
  		.then(function (response) {
      	return response.json();
    })
    	.then(function (data) {
      	console.log(data)
	  	console.log(data.results.data[0].result_object.location_id)
	  	var locationCode = data.results.data[0].result_object.location_id

		const url = 'https://tourist-attraction.p.rapidapi.com/search';
		const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'X-RapidAPI-Key': 'bc2527c02cmsh27f61ab601589f4p155766jsnc49af9f0be56',
			'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com'
		},
		body: new URLSearchParams({
		location_id: locationCode,
		language: 'en_UK',
		currency: 'GBP',
		offset: '0'
		})
	}

	fetch(url, options)
		.then(function (response) {
			return response.json();
		  })
		  .then(function (POIdata) {
			console.log(POIdata)

			POIarray = POIdata.results.data
			console.log(POIarray)
			carouselContent.empty()

			for (let i = 0; i < 5; i++) {
				const element = POIarray[i];
				var POIname = element.name
				console.log(POIname);
				var POIimg = element.photo.images.medium.url
				var POIdescription = element.description
				var POIranking = element.ranking 
				var POIaddress = element.address

				const carouselItem = $('<div>');

				 // unique ID for each carousel item
				 const carouselID = 'carouselItem' + i;
				 carouselItem.attr('id', carouselID);
			 
				carouselItem.addClass('carousel-item')

				if (i === 0) {
					carouselItem.addClass('active')
				}

				POITitle = $('<h5>');
				POITitle.text(POIname);
			

				POIpic = $('<img>');
				POIpic.attr('src', POIimg)

				carouselContainer = $('<div>')
				carouselContainer.addClass('container carousel-text')

				POIdes = $('<p>');
				POIdes.text(POIdescription)

				var POIadd = $('<h6>');
				POIadd.text('Address: ' + POIaddress)

          		var POIrank = $('<p>');
          		POIrank.text('TripAdvisor: ' + POIranking)

				var timeInput = $('<input>')
				timeInput.addClass('time-input')
				timeInput.attr('placeholder', '13:00')

				var saveButton = $('<button>')
				saveButton.addClass('btn primary-btn saveButton')
				saveButton.text('Save to Planner')

				carouselContainer.append(POIadd, POIdes, POIrank, timeInput, saveButton)
				carouselItem.append(POITitle, POIpic, carouselContainer);
				carouselContent.append(carouselItem)

				console.log(POIdata);

			}

			// cal btn for Adam's POI
			const calendarBtn = $('.saveButton');

			$(document).ready(function () {
				calendarBtn.on('click', function (event) {

					event.preventDefault();

					a = $(this)
					b = a.parent().parent()
					c = a.parent().children('input')
					
					plannerPOI = b.children('h5').text()
					plannerTime = c.val().trim()
					plannerAdd = b.children('div').children('h6').text()

					console.log(plannerPOI)
					console.log(plannerTime)
					console.log(plannerAdd)
					
					const poiItem = $('<li>').text(plannerTime + ': ' + plannerPOI);
					const poiAdd = $('<p>').text(plannerAdd);

					$('#time-input').val(plannerTime);
					$('#activity-input').val(plannerPOI);
					$('#add-activity').trigger('click');

				})
			})

		  })	  
	  })
	})