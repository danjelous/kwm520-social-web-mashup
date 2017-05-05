"use-strict";

// Mashup Module (IIF)
let Mashup = (function WeatherMashup() {

    // Hagenberg
    let longitude = 14.4996;
    let latitude = 48.3777;

    let weatherData = {
        city: document.querySelector('#city'),
        weather: document.querySelector('#weather'),
        temperature: document.querySelector('#temperature'),
        temperatureValue: 0,
        units: 'K'
    }

    let loadBackGround = (lat, lon, tag) => {

        let script_element = document.createElement('script');

        if (tag) {
            script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=48d407d1124ad4caaaa30624372789f7&lat=" +
                lat + "&lon=" + lon + "&accuracy=1&tags=" + tag + "&sort=relevance&extras=url_l&format=json";
        } else {
            script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=48d407d1124ad4caaaa30624372789f7&lat=" +
                lat + "&lon=" + lon + "&accuracy=1&sort=relevance&extras=url_l&format=json";
        }

        document.getElementsByTagName('head')[0].appendChild(script_element);
    }

    let switchTemparatureUnits = () => {

        // Calculate
        if (weatherData.units === 'K') {
            weatherData.units = '°C';
            weatherData.temperatureValue -= 273.15;
        } else {
            weatherData.units = 'K';
            weatherData.temperatureValue += 273.15;
        }

        // Display
        weatherData.temperature.innerText = weatherData.temperatureValue + weatherData.units + ', ';
        loadBackGround(position.latitude, position.longitude, weatherData.weather.split(','[0]));
    }

    let getLocationAndWeather = () => {

        // With AJAX and REST
        let xhr = new XMLHttpRequest();

        // Callbacks for xhr request
        xhr.addEventListener('load', () => {

            let response = JSON.parse(xhr.responseText);

            let position = {
                latitude: response.coord.lat,
                longitude: response.coord.lon
            }

            // Reassign API responses to local variables
            weatherData.temperature.innerText = response.main.temp + weatherData.units + ', ';
            weatherData.temperatureValue = response.main.temp;
            weatherData.city.innerText = response.name;
            weatherData.weather.innerText = response.weather[0].main + ', ' + response.weather[0].description;
        });

        // Open async GET request
        xhr.open(
            'GET',
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=6d27a14750ed96c42de990ad1f236ec2`,
            true
        );

        // Actually send
        xhr.send();
    };

    let init = () => {

        // Register click handler
        document.getElementById('temperature').onclick = switchTemparatureUnits;

        try {

            // Does the browser support geolocation?
            if (typeof (navigator.geolocation) == 'undefined') {

                // Alert <3
                alert('Sorry, but location services are not supported by your browser!');
            } else {

                // Get geolocation object
                let gl = navigator.geolocation;
                gl.getCurrentPosition(

                    // Success callback
                    (position) => {
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;

                        // Get current weather;
                        getLocationAndWeather();
                    },

                    // Error callback
                    (error) => {
                        getLocationAndWeather();

                    }
                );
            }

        } catch (error) {

        }
    }

    init();

})();