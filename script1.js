const apiKey = "f413901c1e4d8123585a8c42e90ae181";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const search = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    let data = await response.json();

    console.log(data);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML =  Math.round(data.main.temp)  + "c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
        
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/images/clouds.png"
        }
        if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/images/clear.png"
        }
        if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/images/rain.png"
        }
        if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/images/drizzle.png"
        }
        if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/images/mist.png"
        }
    
        document.querySelector(".weather").style.display = "block";
    
    }

    }

   

searchButton.addEventListener("click", () => {
    checkWeather(search.value);
})
