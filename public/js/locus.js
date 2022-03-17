const apiKey = "af9e6368dcce66f0f1162a446b5e0d9a";
window.onload = function() {
    document.getElementById("submit").onclick = test;
  }

  function test() {
    let zip = document.getElementById("dLoc").value;
    const url = 'https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}'
  };
