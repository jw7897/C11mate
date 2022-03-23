const apiKey = "af9e6368dcce66f0f1162a446b5e0d9a";
let currTemp;
let feelsLike;
let pChance;
let wSpeed;
let humid;
let city;

let currTemp2;
let feelsLike2;
let pChance2;
let wSpeed2;
let humid2;
let city2;

window.onload = function() {
  document.getElementById("submit").onclick = execute;

}


function execute() {
  execute2();
  let fZip = document.getElementById("fZip").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${fZip}&appid=${apiKey}`
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
      document.getElementById("fZipInfo").innerHTML =  city + "<br> Current Temp: " + currTemp+ "<br> Feels Like: "  + feelsLike+ "<br> Wind Speed: "  + wSpeed+ "<br> Humidity: "  + humid;
    })
    .catch((err) => {
      alert(err);
    });
};

function execute2() {
  let sZip = document.getElementById("sZip").value;
  const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${sZip}&appid=${apiKey}`
  fetch(url2)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      currTemp2 = (((res.main.temp) - 273.15)*1.8) + 32;
      feelsLike2 = (((res.main.feels_like) - 273.15)*1.8) + 32;
      wSpeed2 = res.wind.speed;
      humid2 = res.main.humidity;
      city2 = res.name
      document.getElementById("sZipInfo").innerHTML = city2 + "<br> Current Temp: " + currTemp2 + "<br> Feels Like: "  + feelsLike2 + "<br> Wind Speed: "  + wSpeed2+ "<br> Humidity: "  + humid2;
    })
    .catch((err) => {
      alert(err);
    });
    return;
};