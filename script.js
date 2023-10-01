// API key for OpenWeatherMap
const apiKey = "f413901c1e4d8123585a8c42e90ae181";

// URL for the OpenWeatherMap API
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";

// DOM elements
const searchInput = document.querySelector('#search'); // Input field
const forecastContainer = document.querySelector('.forecast'); // Container for forecast data
const errorContainer = document.querySelector('.error'); // Container for error messages
const searchForm = document.getElementById('search-form'); // Search form element

// Event listener for the form submission
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = searchInput.value.trim(); // Get the city name from the input field

    if (city) {
        // If a city name is provided, fetch the five-day forecast
        fetchFiveDayForecast(city);
    } else {
        // Handle a case where the input is empty
        errorContainer.textContent = 'Enter a valid city name';
        errorContainer.style.display = 'block';
        forecastContainer.style.display = 'none';
    }
})

// Function to fetch the five-day forecast
function fetchFiveDayForecast(city) {
    // Clear error messages and previous forecast
    forecastContainer.innerHTML = '';
    errorContainer.style.display = 'none';

    // Fetch data from the OpenWeatherMap API
    fetch(apiUrl + city + `&appid=${apiKey}`)
        .then(function (response) {
            // Check if the response is successful; otherwise, throw an error
            if (!response.ok) {
                throw new Error('Unable to retrieve data from OpenWeather')
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data); // Log the API response data to the console

            // Check if the response data contains a list of forecasts
            if (data.list && data.list.length > 0) {
                // Extract information for the next five days
                const necessaryInformation = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]];
                cycleInformation(necessaryInformation);
            } else {
                // Throw an error for an invalid format
                throw new Error('Invalid Data Format')
            }
        })
        .catch(function (error) {
            console.error(error); // Log any errors to the console

            // Handle any errors that occur during the fetch
            errorContainer.textContent = 'An error occurred while fetching data. Please try again later.';
            errorContainer.style.display = 'block';
            forecastContainer.style.display = 'none';
        });
}

// Function to cycle through and display forecast information
function cycleInformation(data) {
    // Iterate through the array and display information for each day
    for (let i = 0; i < data.length; i++) {
        const dayData = data[i];
        const dayElement = document.createElement('div');
        dayElement.classList.add('day'); // Add a CSS class for styling

        // Create and format date element
        const dateElement = document.createElement('h2');
        dateElement.classList.add('date');
        dateElement.textContent = formatDate(dayData.dt);

        // Create and display temperature information
        const tempElement = document.createElement('p');
        tempElement.classList.add('temp');
        tempElement.textContent = `Temperature: ${dayData.main.temp.toFixed(1)}°C`;

        // Create and display humidity information
        const humidityElement = document.createElement('p');
        humidityElement.classList.add('humidity');
        humidityElement.textContent = `Humidity: ${dayData.main.humidity}%`;

        // Create and display wind information
        const windElement = document.createElement('p');
        windElement.classList.add('wind');
        windElement.textContent = `Wind: ${dayData.wind.speed.toFixed(1)} km/h`;

        // Create and display weather description
        const weatherElement = document.createElement('p');
        weatherElement.classList.add('weather');
        weatherElement.textContent = `Weather: ${dayData.weather[0].description}`; // Access description property

        // Append elements to the dayElement
        dayElement.appendChild(dateElement);
        dayElement.appendChild(tempElement);
        dayElement.appendChild(humidityElement);
        dayElement.appendChild(windElement);
        dayElement.appendChild(weatherElement);

        // Append the dayElement to the forecastContainer
        forecastContainer.appendChild(dayElement);
    }
}

// Function to format a timestamp into a readable date
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}
