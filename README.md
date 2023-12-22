# Travel Fanatix Daily Planner

## Description

Have you ever tried to plan your day in a foreign city and been unsure where to start? The Travel Fanatix daily travel planner allows you to create and organise a schedule of activities for your day.

The travel planner will provide you with five recommended points of interest, along with the corresponding address, description and its rank on TripAdvisor. If the point of interest is something you want to see, add it to your planner with the press of a button!

## URL



## APIs

- DayJS - provides date and time functionality to the application
- Tourist Attraction - provides all the information on POIs in the city of your choosing
- OpenWeather - provides up-to-date weather information to the application
- Unsplash - provides stock imagery that compliments the city of choice

## Installation

N/A

## Usage

The application will locate itself in your current city using geolocation, displaying the current time, weather and a stock photo of that city.

If you want to change the city that the application is focusing on, simply input the new city into the search box, click search and then the Tourist Attraction API will provide the application with all-new location data.

The planner takes up the bottom-left portion of the application. It has functionality to add events to your planner manually, inputting the activity you're planning to do, and the time you plan to do it. 

However, if you'd like some suggestions for things to do in your city, click the button in the bottom-right portion of the application. That will open a modal containing a carousel of Points of Interest, complete with their TripAdvisor ranking, the address, and a brief description of the POI.

The modal will also provide you with the ability to add the event - as well as the time you wish to do it - directly to your planner with the click of a button! Refresh the page, and you'll see that your changes have been saved to local storage.

## Credit

## Licence

MIT