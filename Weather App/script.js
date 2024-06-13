const APIURL = "https://api.weatherapi.com/v1/";

const weather = document.querySelector(".weather");

const getTemp = async (city) => {
    try {
        const response = await fetch(APIURL + `current.json?key=063d509e02de48069b9122115240606&q=${city}&aqi=no`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check if the response contains valid data
        if (data && data.current) {
            weather.innerHTML = `
                <img src="${data.current.condition.icon}" class="weather-icon">
                <h1 class="temp">${data.current.temp_c}°C</h1>
                <h2 class="city">${data.location.name}</h2>
                <h3>${data.current.condition.text}</h3>
                <div class="details">
                    <div class="col">
                        <img src="assets/humidity.png">
                        <div>
                            <p class="humidity">${data.current.humidity}</p> 
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="col">
                        <img src="assets/wind.png">
                        <div>
                            <p class="wind">${data.current.wind_kph} kph</p> 
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>`;
        } else {
            throw new Error('Invalid data received');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weather.innerHTML = `<p class="error">Failed to fetch weather data. Please try a valid city name.</p>`;
    }
};

const getWeather = () => {
    const city = document.querySelector(".search-bar").value.trim();
    if (city) {
        getTemp(city);
        document.querySelector(".search-bar").value = "";
    } else {
        weather.innerHTML = `<p class="error">Please enter a city name.</p>`;
    }
    return false;  // Prevents default form submission if used within a form
};
