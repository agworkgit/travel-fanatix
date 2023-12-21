// Function to get weather and city name
function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;

            const queryUrlCityName = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=5b24cae96a98f68f0e09599b72878057`;

            fetch(queryUrlCityName)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    const currentCity = data[0].name;
                    const userCity = $('.userCity');
                    userCity.text(currentCity)

                    // Query URL for the weather
                    const queryURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto`;

                    fetch(queryURL)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {

                            const currentDate = dayjs().format('D/MM/YYYY');
                            const userDate = $('.userDate');
                            userDate.text(currentDate);

                            const currentTemp = data.current.temperature_2m;
                            const userTemp = $('.userTemp');
                            userTemp.text(`Current temperature is: ${currentTemp} °C`);

                            const currentWeatherCode = data.current.weather_code;
                            const userWeatherCode = $('.userWeatherCode');
                            const weatherImage = $('img');
                            weatherImage.attr('src', 'images/' + currentWeatherCode + '.svg');
                            userWeatherCode.text(`Current weather code is: ${currentWeatherCode}`);

                            const currentHumidity = data.current.relative_humidity_2m;
                            const userHumidity = $('.userHumidity');
                            userHumidity.text(`Current humidity is: ${currentHumidity}%`);

                            const currentWindSpeed = data.current.wind_speed_10m;
                            const userWind = $('.userWind');
                            userWind.text(`Current wind speed is: ${currentWindSpeed} m / s`);

                            let middayArray = [];

                            // For loop to find out the midday temperature for the next 6 days
                            for (let i = 0; i < data.hourly.time.length; i++) {
                                let eachMidday = data.hourly.time[i].substring(11);
                                let arrayContainsMidday = (eachMidday.indexOf("12:00") > -1);
                                if (arrayContainsMidday) {
                                    const middayObject = {
                                        date: data.hourly.time[i].substring(0, 10),
                                        temp: data.hourly.temperature_2m[i],
                                        wcode: data.hourly.weather_code[i]
                                    }
                                    middayArray.push(middayObject);
                                }
                            }

                            // For each loop to gather each days date and also temperature
                            middayArray.forEach((day) => {

                                const date = dayjs(day.date).format('D/M/YYYY');
                                console.log(date)

                                const temp = `${day.temp} °C`;
                                console.log(temp);

                                const weatherCode = `Weather code is ${day.wcode}`;
                                console.log(weatherCode);

                            })
                        });
                })
        });
    } else {
        console.log("Turn ya damn location on");
    }
}

getWeather()

// Weather Codes
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail
