
const iconElement = document.querySelector(".icons");
const searchBtn = document.querySelector(".search-btn-container");
const tempElement = document.querySelector(".temperature-value");
const descElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const humidityElement = document.querySelector(".temperature-humidity");
const windSpeedElement = document.querySelector(".temperature-wind-speed");
const notificationElement = document.querySelector(".notification");

let weather = {
    apiKey: '50e3dd197d2061000fc6a99dabfcf3ce',
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city + 
        "&units=metric&appid=" 
        + this.apiKey
        ).then((response) => {
            if(!response.ok) {
                alert("No weather found!!!");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        let desc = capitialize(description);
        
        console.log(name,icon,description,temp,humidity,speed);
      
        locationElement.innerText = `${name}`;
        iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
          
        tempElement.innerText = temp + '°C';

        ;
        descElement.innerText = desc;
        humidityElement.innerText = "Humidity : " + humidity +"%";
        windSpeedElement.innerText =  "Wind Speed : " + speed + " km/h";
    },
    search: function () {
        this.fetchWeather(document.querySelector("#search").value);
    },
};

searchBtn.addEventListener("click", function () {
    weather.search();
});

document.querySelector("#search").addEventListener("keyup",function (event) {
    if(event.key === "Enter"){
        weather.search();
    }
});

function capitialize(string) {
    let words = string.split(' ');
    for(let i=0 ; i < words.length ; i++)
        words[i] = words[i][0].toUpperCase() + words[i].substr(1); 
    return words.join(' ');
}
weather.fetchWeather("Delhi");

