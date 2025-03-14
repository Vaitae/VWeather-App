async function fetchWeather() {
    const searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "02762d3ce255f5664ae3de63ae10efdb";
  
    if (searchInput === "") {
      weatherDataSection.innerHTML = `
        <div>
          <h2>Empty Input!</h2><br>
          <p>Please try again with a valid <i>"City name"</i>.</p>
        </div>
      `;
      return;
    }
  
    async function getLonAndLat() {
      const countryCode = "IN"; // Replace with appropriate country code
      const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput},${countryCode}&limit=1&appid=${apiKey}`;
      const response = await fetch(geocodeURL);
      if (!response.ok) {
        console.log("Bad response! ", response.status);
        return;
      }
      const data = await response.json();
      if (data.length === 0) {
        console.log("Something went wrong here.");
        weatherDataSection.innerHTML = `
          <div>
            <h2>Invalid Input: "${searchInput}"</h2><br>
            <p>Please try again with a valid <i>"City Name"</i>.</p>
          </div>
        `;
        return;
      } else {
        return data[0];
      }
    }
  
    async function getWeatherData(lon, lat) {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const response = await fetch(weatherURL);
      if (!response.ok) {
        console.log("Bad response! ", response.status);
        return;
      }
      const data = await response.json();
      weatherDataSection.innerHTML = `
        <div>
          <h2 class="city"><p>Weather in ${data.name}</p></h2>
          <p><h1 class="temp">${Math.round(data.main.temp - 273.15)}°C</h1></p>
         <div class="flex">
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="icon" alt="${data.weather[0].description}" width="55" />  
         <div class="description">${data.weather[0].description}</div>
        </div>

        </div>
      `;
    }
  
    document.getElementById("search").value = "";
    const geocodeData = await getLonAndLat();
    getWeatherData(geocodeData.lon, geocodeData.lat);
    weatherDataSection.style.display = "flex";
  }
