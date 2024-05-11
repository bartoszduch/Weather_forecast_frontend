document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('coordinates-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form's default action

        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            alert('Please enter valid latitude (between -90 and 90) and longitude (between -180 and 180) values as floats.');
            return; // Stop the function if validation fails
        }
        const url = `http://127.0.0.1:5000/weather?latitude=${latitude}&longitude=${longitude}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const tableBody = document.querySelector('#weather-table tbody');
                tableBody.innerHTML = ''// Clears previous data; 

                data.forEach(weather => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${weather.date}</td>
                        <td>${weather.weather_code}</td>
                        <td>${weather.temperature_min}</td>
                        <td>${weather.temperature_max}</td>
                        <td>${weather.sunshine_duration}</td>
                        <td>${weather.energy}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    });
});