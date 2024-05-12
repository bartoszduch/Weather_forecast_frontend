<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Weather Forecast Application for Codibly - FRONTEND</h1>
    </header>
    <section>
        <h2>Description</h2>
        <p>The Weather Forecast Application is a web-based tool that displays weather forecasts for the next 7 days, either based on user-entered geographical coordinates or using the user's current location provided by geolocation services.</p>
    </section>
    <section>
        <h2>Features</h2>
        <ul>
            <li>Manual input of latitude and longitude coordinates into a form.</li>
            <li>Option to use current location via the browser's geolocation API.</li>
            <li>Weather data is fetched from a backend endpoint using these coordinates.</li>
            <li>Detailed weather information display including weather icons mapped from weather codes, minimum and maximum temperatures, duration of sunshine, and energy calculations.</li>
        </ul>
    </section>
    <section>
        <h2>Usage Instructions</h2>
        <ol>
            <li>Open the application in a modern web browser with JavaScript enabled.</li>
            <li>Enter the latitude and longitude in the designated fields or click on "Use My Location" to use your current geographic location.</li>
            <li>Press "Display weather data" to view the forecast.</li>
        </ol>
    </section>
    <section>
        <h2>Data Validation and Limitations</h2>
        <ul>
            <li>Latitude must be a number between -90 and 90.</li>
            <li>Longitude must be a number between -180 and 180.</li>
            <li>Inputs are validated to ensure they meet these numeric constraints.</li>
        </ul>
    </section>
    <section>
        <h2>Backend Interaction</h2>
        <p>The application fetches weather data from a backend server endpoint: <code>http://127.0.0.1:5000/weather?latitude={latitude}&amp;longitude={longitude}</code>. This endpoint must be reachable and respond with JSON formatted weather data.</p>
    </section>
    <section>
        <h2>Weather Code Icon Mapping</h2>
        <p>Weather codes received from the backend are mapped to corresponding icons using a JavaScript function, enhancing the visual presentation of forecasts.</p>
    </section>
</body>
</html>
