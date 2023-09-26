const apiKey = "f413901c1e4d8123585a8c42e90ae181";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchInput = document.querySelector('.search');
const forecastContainer = document.querySelector('.forecast');
const errorContainer = document.querySelector('.error');
const searchForm = document.getElementById('search-form');

// Function to fetch the five-day forecast
async function fetchFiveDayForecast(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Unable to fetch data');
        }
        const data = await response.json();

        // Clear previous forecast data
        forecastContainer.innerHTML = '';

        // Loop through the data and populate the forecastContainer
        for (let i = 0; i < 5; i++) { // Assuming you want to display the next 5 days
            const dayData = data.daily[i];
            
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');

            const dateElement = document.createElement('h2');
            dateElement.classList.add('date');
            dateElement.textContent = formatDate(dayData.date); // Implement a function to format the date

            const iconElement = document.createElement('img');
            iconElement.src = getWeatherIconUrl(dayData.icon); // Implement a function to get the weather icon URL
            iconElement.alt = dayData.description;
            iconElement.classList.add('weather-icon');

            const tempElement = document.createElement('p');
            tempElement.classList.add('temp');
            tempElement.textContent = `${dayData.temp}°C`;

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('description');
            descriptionElement.textContent = dayData.description;

            dayElement.appendChild(dateElement);
            dayElement.appendChild(iconElement);
            dayElement.appendChild(tempElement);
            dayElement.appendChild(descriptionElement);

            forecastContainer.appendChild(dayElement);
        }

        errorContainer.style.display = 'none';
        forecastContainer.style.display = 'block';
    } catch (error) {
        console.error(error);
        errorContainer.style.display = 'block';
        forecastContainer.style.display = 'none';
    }
}

// Event listener for the search button
function searchQuery (event) {
    event.preventDefault();
    const city = searchInput.value;
    console.log(city);
    //fetchFiveDayForecast(city);
}

searchForm.addEventListener('submit', searchQuery) 
// Function to format the date (you can implement this function)
function formatDate(date) {
    // Implement date formatting logic here
}

// Function to get the weather icon URL (you can implement this function)
function getWeatherIconUrl(icon) {
    // Implement logic to map weather icons to image URLs
}
