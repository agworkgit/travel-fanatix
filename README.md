# Travel Fanatix Daily Planner

## Description

Have you ever tried to plan your day in a foreign city and been unsure where to start? 

The Travel Fanatix daily travel planner allows you to create and organise a schedule of activities for your day.

The travel planner will provide you with five recommended points of interest, along with the corresponding address, description and its rank on TripAdvisor. 

If the point of interest is something you want to see, add it to your planner with the press of a button!

## URL

Check the deployed web app at the following link <https://agworkgit.github.io/travel-fanatix/>

## APIs

- DayJS - provides date and time functionality to the application
- Tourist Attraction - provides all the information on POIs in the city of your choosing
- OpenWeather - provides up-to-date weather information to the application
- Unsplash - provides stock imagery that compliments the city of choice

## Installation

Installation not required, use the deployed link listed under Usage.

## Usage

The application will locate itself in your current city using geolocation, displaying the current time, weather and a stock photo of that city.

If you want to change the city that the application is focusing on, simply input the new city into the search box, click search and then the Tourist Attraction API will provide the application with all-new location data.

The planner takes up the bottom-left portion of the application. It has functionality to add events to your planner manually, inputting the activity you're planning to do, and the time you plan to do it. 

However, if you'd like some suggestions for things to do in your city, click the button in the bottom-right portion of the application. That will open a modal containing a carousel of Points of Interest, complete with their TripAdvisor ranking, the address, and a brief description of the POI.

The modal will also provide you with the ability to add the event - as well as the time you wish to do it - directly to your planner with the click of a button! Refresh the page, and you'll see that your changes have been saved to local storage.

The following image shows the web application's appearance and functionality:

![This web app is built with the use of HTML, CSS, Bootstrap, JS and APIs.](./resources/images/edx-project-1-demo.gif)

> **Note**: This layout is designed to be responsive and will change appearence based on time of day (day/night).

## Credit

Alex Grigore - Tech Lead, Design, User Interface, User Experience, APIs

Adam Blampied - APIs, User Experience, Documentation

Matthew Lightfoot - APIs, User Experience, User Interface

Amaal Abdulle - User Experience, Documentation

## Licence

MIT License

Copyright (c) 2023 Alex Grigore, Adam Blampied, Matthew Lightfoot, Amaal Abdulle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

![edX](https://img.shields.io/badge/edX-%2302262B.svg?style=for-the-badge&logo=edX&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
