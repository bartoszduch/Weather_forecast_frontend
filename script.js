document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('coordinates-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form's default action

        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            alert('Please enter valid latitude (between -90 and 90) and longitude (between -180 and 180) values.');
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
                const table = document.getElementById('weather-table');
                const thead = table.tHead;
                thead.innerHTML = ''; // Clear previous header
                const headerRow = document.createElement('tr');
                thead.appendChild(headerRow);

                const tbody = table.tBodies[0];
                tbody.innerHTML = ''; // Clears previous data

                const fields = ['date', 'weather_code', 'temperature_min', 'temperature_max', 'sunshine_duration', 'energy'];
                
                // Create headers and rows for each field
                fields.forEach(field => {
                    const row = document.createElement('tr');
                    tbody.appendChild(row);
                });

                data.forEach((dayData, dayIndex) => {
                    const dateHeader = document.createElement('th');
                

                    fields.forEach((field, index) => {
                        const cell = document.createElement('td');
                        if (field === 'weather_code') {
                            const icon = document.createElement('i');
                            const iconClass = weatherCodeToIcon(dayData[field]) || 'fa-sun'; // Default to 'sun' icon
                            icon.className = `fas ${iconClass}`;
                            cell.appendChild(icon);
                        } else {
                            cell.textContent = dayData[field];
                        }
                        tbody.rows[index].appendChild(cell);
                    });
                });
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    });
});

// Helper function to map weather codes to Font Awesome icons
function weatherCodeToIcon(code) {
    const map = {
        '0': 'fa-sun',                 // Clear sky
        '1': 'fa-cloud-sun',           // Mainly clear
        '2': 'fa-cloud-sun',           // Partly cloudy
        '3': 'fa-cloud',               // Overcast
        '45': 'fa-smog',               // Fog
        '48': 'fa-smog',               // Depositing rime fog
        '51': 'fa-cloud-rain',         // Light drizzle
        '53': 'fa-cloud-rain',         // Moderate drizzle
        '55': 'fa-cloud-showers-heavy',// Dense drizzle
        '56': 'fa-icicles',            // Light freezing drizzle
        '57': 'fa-icicles',            // Dense freezing drizzle
        '61': 'fa-cloud-rain',         // Light rain
        '63': 'fa-cloud-rain',         // Moderate rain
        '65': 'fa-cloud-showers-heavy',// Heavy rain
        '66': 'fa-snowflake',          // Light freezing rain
        '67': 'fa-snowflake',          // Heavy freezing rain
        '71': 'fa-snowflake',          // Light snowfall
        '73': 'fa-snowflake',          // Moderate snowfall
        '75': 'fa-snowflake',          // Heavy snowfall
        '77': 'fa-snowflake',          // Snow grains
        '80': 'fa-cloud-showers-heavy',// Slight rain showers
        '81': 'fa-cloud-showers-heavy',// Moderate rain showers
        '82': 'fa-poo-storm',          // Violent rain showers
        '85': 'fa-snowflake',          // Light snow showers
        '86': 'fa-snowflake',          // Heavy snow showers
        '95': 'fa-bolt',               // Slight/moderate thunderstorm
        '96': 'fa-bolt',               // Thunderstorm with light hail
        '99': 'fa-bolt'                // Thunderstorm with heavy hail
    };
    return map[code];
}

