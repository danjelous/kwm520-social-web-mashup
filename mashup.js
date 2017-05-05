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

    let getLocationAndWeather = () => {

        // With AJAX and REST
        let xhr = new XMLHttpRequest();

        // Callbacks for xhr request
        xhr.addEventListener('load', () => {

            let response = JSON.parse(xhr.responseText);
            console.log(response);
        });

        // Open async GET request
        xhr.open('GET',
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=6d27a14750ed96c42de990ad1f236ec2`,
            true
        );

        // Actually send
        xhr.send();

    };

    let init = () => {

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