document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('get-weather').addEventListener('click', function() {
        var town = document.getElementById('town-input').value;
        var openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${town}&key=51e49fccadee4bcfbb8aa926b0b06e24`;

        fetch(openCageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('OpenCage Data:', data); // Debug line
                var latitude = data.results[0].geometry.lat;
                var longitude = data.results[0].geometry.lng;

                var url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,rain,wind_speed_10m&wind_speed_unit=mph&forecast_days=1`;
                return fetch(url);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Open-Meteo Data:', data); // Debug line
                var weatherResult = document.getElementById('weather-result');
                weatherResult.innerHTML = `Temperature: ${data.current.temperature_2m}°C<br>Rain: ${data.current.rain}mm<br>Wind Speed: ${data.current.wind_speed_10m}mp/h`;
            })
            .catch(error => {
                console.error('Error:', error);
                var errorMessage = document.getElementById('error-message');
                errorMessage.innerHTML = `Error: ${error.message}`;
            });
    });
});