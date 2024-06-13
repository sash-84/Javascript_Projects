const apikey = "3084f44c5440aa8996e6705381b02d31";

const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");

const searchbtn = document.querySelector(".search button");

const weathericon = document.querySelector(".weather-icon");

searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(searchbox.value);
    searchbox.value = "";
});

async function getWeather(city) {

    try{
        const response = await fetch(apiurl + city +`&appid=${apikey}`);

        if(!response.ok){
            throw new Error("City not found !");
        }

        const data = await response.json();
        console.log(data);
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "kph";
        document.querySelector(".description").innerHTML = data.weather[0].description;
    
        if (data.weather[0].main == "Clouds") {
            weathericon.src = "assets/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weathericon.src = "assets/clear.png";
        }
        else if (data.weather[0].main == "Rain") {  
            weathericon.src = "assets/rain.png";
        }   
        else if (data.weather[0].main == "Snow") {
            weathericon.src = "assets/snow.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "assets/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weathericon.src = "assets/mist.png";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").innerHTML = error.message;
    }   
}
