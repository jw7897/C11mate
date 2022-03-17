const apiKey = "af9e6368dcce66f0f1162a446b5e0d9a";
let content = document.getElementById("content").innerHTML;
let currTemp;
let feelsLike;
let pChance;
let wSpeed;
let humid;
let city;

window.onload = function() {
  document.getElementById("submit").onclick = execute;
}

function execute() {
  console.log("test");
  let zip = document.getElementById("dLoc").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      currTemp = (((res.main.temp) - 273.15)*1.8) + 32;
      feelsLike = (((res.main.feels_like) - 273.15)*1.8) + 32;
      wSpeed = res.wind.speed;
      humid = res.main.humidity;
      city = res.name
      document.getElementById("content").innerHTML = content + "<br>" + city + "<br> Current Temp: " + currTemp+ "<br> Feels Like: "  + feelsLike+ "<br> Wind Speed: "  + wSpeed+ "<br> Humidity: "  + humid;
    })
    .catch((err) => {
      alert(err);
    });
    return;
};

