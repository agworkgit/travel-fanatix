const calendarBtn = $('.modal-footer .btn-primary')


$(document).ready(function () {
    // Event handler for "Add to Calendar" button click
    calendarBtn.on('click', function () {
        // Get the active tab
        const tab1Content = $('#tab1');

        // Get card information based on the active tab
         // Get card title and text from "Tab 1"
         const cardTitle = tab1Content.find('.card-title').text();
         const cardText = tab1Content.find('.card-text').text();

         console.log("Card Title: ", cardTitle);
         console.log("Card Text: ", cardText);

        // Create a new list item
        const listItem = $('<li>').text(cardTitle);

        // Append the list item to the existing list
        $('#calendarList').append(listItem);

        // Close the modal
        // $('#exampleModal4').modal('hide');
    });
});
