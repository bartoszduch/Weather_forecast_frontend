document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('coordinates-form');
    const useLocationBtn = document.getElementById('use-location');
    const loadingDiv = document.getElementById('loading');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        submitCoordinates();
    });

    useLocationBtn.addEventListener('click', function() { // Unfortunately, getting data based on location takes a while; the application is not as responsive as when typing coordinates from the keyboard
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                document.getElementById('latitude').value = position.coords.latitude.toFixed(2);
                document.getElementById('longitude').value = position.coords.longitude.toFixed(2);
                submitCoordinates(); // Update after changing coordinates
            }, function(error) {
                alert('Error: ' + error.message);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    function submitCoordinates() {
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        if (!isValidCoordinates(latitude, longitude)) {
            alert('Please enter valid latitude (between -90 and 90) and longitude (between -180 and 180) values.');
            return;
        }

        loadingDiv.style.display = 'block'; // Show loading message
        const url = `https://codibly-1.onrender.com/weather?latitude=${latitude}&longitude=${longitude}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data); // Log the data for debugging
                updateWeatherTable(data);
                loadingDiv.style.display = 'none'; // Hide loading message
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                loadingDiv.style.display = 'none'; // Hide loading message in case of error
            });
    }

    function isValidCoordinates(lat, lon) {
        return !isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
    }

    function updateWeatherTable(data) {
        const table = document.getElementById('weather-table');
        const thead = table.tHead;
        thead.innerHTML = '';
        const headerRow = document.createElement('tr');

        const dateHeader = document.createElement('th');
        dateHeader.textContent = "Date";
        headerRow.appendChild(dateHeader);

        data.forEach((dayData) => {
            const dateHeader = document.createElement('th');
            dateHeader.textContent = dayData.date;
            headerRow.appendChild(dateHeader);
        });
        thead.appendChild(headerRow);

        const tbody = table.tBodies[0];
        tbody.innerHTML = '';

        const fields = ['weather_code', 'temperature_min', 'temperature_max', 'sunshine_duration', 'energy']; // Removed 'date'
        fields.forEach(field => {
            const row = document.createElement('tr');
            const fieldName = document.createElement('td');
            fieldName.textContent = field.replace('_', ' ').toUpperCase();
            if (field === 'energy') {
                fieldName.textContent = 'Generated energy [kwh]'.toUpperCase();
            }
            row.appendChild(fieldName);
            tbody.appendChild(row);

            data.forEach((dayData) => {
                const cell = document.createElement('td');
                if (field === 'weather_code') {
                    const icon = document.createElement('i');
                    const iconClass = weatherCodeToIcon(dayData[field]) || 'fa-sun';
                    icon.className = `fas ${iconClass}`;
                    cell.appendChild(icon);
                } else {
                    cell.textContent = dayData[field];
                }
                row.appendChild(cell);
            });
        });
    }

    // Function that maps weather codes to icons
    function weatherCodeToIcon(code) {
        const map = {
            '0': 'fa-sun',                 
            '1': 'fa-cloud-sun',           
            '2': 'fa-cloud-sun',           
            '3': 'fa-cloud',               
            '45': 'fa-smog',              
            '48': 'fa-smog',               
            '51': 'fa-cloud-rain',         
            '53': 'fa-cloud-rain',         
            '55': 'fa-cloud-showers-heavy',
            '56': 'fa-icicles',            
            '57': 'fa-icicles',            
            '61': 'fa-cloud-rain',         
            '63': 'fa-cloud-rain',         
            '65': 'fa-cloud-showers-heavy',
            '66': 'fa-snowflake',          
            '67': 'fa-snowflake',          
            '71': 'fa-snowflake',         
            '73': 'fa-snowflake',          
            '75': 'fa-snowflake',          
            '77': 'fa-snowflake',          
            '80': 'fa-cloud-showers-heavy',
            '81': 'fa-cloud-showers-heavy',
            '82': 'fa-poo-storm',          
            '85': 'fa-snowflake',          
            '86': 'fa-snowflake',          
            '95': 'fa-bolt',               
            '96': 'fa-bolt',               
            '99': 'fa-bolt'                
        };
        return map[code] || 'fa-question'; // If code is not found, show a question mark
    }
});
