const weather = require("openweather-apis");
const apiKey = "af9e6368dcce66f0f1162a446b5e0d9a";
weather.setAPPID(apiKey);
weather.setLang("en");
weather.setUnits('metric');

const fetch = require("node-fetch");
const cities = require('cities');


const forecast = require("weather-js");

const StaticMaps = require('staticmaps');
const options = {
    width: 600,
    height: 400,
  };
let map = new StaticMaps(options);



//GET "/" & GET "/travel": Render the Travel page when the user accesses the home page.
exports.travel = (request, response) => {
    response.render("travel.ejs");
};

//GET "/locus": Render the Locus page
exports.locus = (request, response) => {
    response.render("locus.ejs");
};

//GET "/compare": Render the Compare page
exports.compare = (request, response) => {
    response.render("compare.ejs");
};

//POST "/locus": Make a API Call to OpenWeather for the weather in an area.
exports.locusShow = (request, response) =>{
    
    weather.setZipCode(null);   //Makes sure that previous requests made with zip codes are not kept in weather.
    var dLoc = request.body.dLoc;

    if(dLoc.match(/\d{5}/)){
        weather.setZipCode(dLoc);
    }else{
        weather.setCity(dLoc);
    }

    weather.getAllWeather(function(err, areaWeatherData){

        response.render("locus.ejs", {areaWeatherData});
	});

}


exports.travelShow = (request, response) => {
    let dLoc = request.body.dLoc;
    let sLoc = request.body.sLoc;
    function cityInfo(city,lat,lng) {
        this.city = city;
        this.lat = lat;
        this.lng = lng;
    }
    function tripInfo(city,temperature,desc,pChance,image){
        this.city = city;
        this.temperature = temperature;
        this.desc = desc;
        this.pChance = pChance;
        this.image = image;
    }
    let cityNames =[];
    let cityDetails=[];
    let cityFinal = [];

    if(dLoc == "" || sLoc == ""){
        console.error("etst");
        return;
    }

    fetch(`https://open.mapquestapi.com/directions/v2/route?key=AupiTAGIpeSPK9QKImU2KAltgKBqAGwJ&from=${sLoc}&to=${dLoc}`)
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
          //Gets each unique city name in trip
        for (let i = 0; i < res.route.legs[0].maneuvers.length; i++) {
            if(!cityNames.includes(cities.gps_lookup(res.route.legs[0].maneuvers[i].startPoint.lat, res.route.legs[0].maneuvers[i].startPoint.lng).city) && cities.gps_lookup(res.route.legs[0].maneuvers[i].startPoint.lat, res.route.legs[0].maneuvers[i].startPoint.lng).city != ""){
                cityNames.push(cities.gps_lookup(res.route.legs[0].maneuvers[i].startPoint.lat, res.route.legs[0].maneuvers[i].startPoint.lng).city)
                cityDetails.push(new cityInfo(cities.gps_lookup(res.route.legs[0].maneuvers[i].startPoint.lat, res.route.legs[0].maneuvers[i].startPoint.lng).city,res.route.legs[0].maneuvers[i].startPoint.lat, res.route.legs[0].maneuvers[i].startPoint.lng ));
            }
        }

        //Creates map with starting city and destination city
        let line = {
            coords: [
              [cityDetails[0].lng,cityDetails[0].lat],
              [cityDetails[cityDetails.length-1].lng,cityDetails[cityDetails.length-1].lat]
            ],
            color: '#0000FFBB',
            width: 3
          };
          map.addLine(line);
          await map.render();
          await map.image.save('public/images_for_weather/polyline.png');

        //Gets weather informationf or each city
        cityFinal = Array(cityDetails.length).fill('a');
        for (let i = 0; i < cityDetails.length; i++) {
            forecast.find({search:  cityDetails[i].city, degreeType: 'F'}, function(err, data) {
                cityFinal[i] = new tripInfo(cityDetails[i].city, data[0].current.temperature,data[0].current.skytext, data[0].forecast[1].precip, data[0].current.imageUrl);              
                if(!cityFinal.includes('a')){
                    response.render("travel.ejs", {tripWeatherData: cityFinal});
                }
            });           
             }
    })

    .catch((err) => {
        console.log(err);
      });
      return;
  }