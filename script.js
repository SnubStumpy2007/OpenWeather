const apiKey = "f413901c1e4d8123585a8c42e90ae181";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=tokyo";
const search = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    let data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =  Math.round(data.main.temp)  + "c";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
}

searchButton.addEventListener("click", () => {
    checkWeather(search.value);
})
