const weather = require("openweather-apis");
const apiKey = "af9e6368dcce66f0f1162a446b5e0d9a";
weather.setAPPID(apiKey);
weather.setLang("en");
weather.setUnits('metric');

const forecast = require("weather-js"); //Node Module used to get the 3 day weather forecast.
const dateFormat = require("fecha"); //Node Module used to format the date.
const fetch = require("node-fetch");
const cities = require('cities');
const StaticMaps = require('staticmaps');
const options = {
    width: 600,
    height: 400,
  };
  let map = new StaticMaps(options);
  const sMarker = {
    img: 'public/images_for_weather/start.png', 
    offsetX: 24,
    offsetY: 48,
    width: 48,
    height: 48
  };

  const dMarker = {
    img: 'public/images_for_weather/dest.png',
   offsetX: 24,
    offsetY: 48,
    width: 48,
    height: 48
  };


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

    let forecastData = []; //Holds an array for the 3-Day forecast 
    let rainChance;     //Holds the chance of rain to be stored in the returned OpenWeatherAPI object.
    let wind;       //Holds the wind information to be stored in the returned OpenWeatherAPI object.
    let dLoc = request.body.dLoc;   //Stores the input from the user.
    let dateArray = [];     //Stores the date array returned from the forecast API after the string is split. Example: ["2021", "1", "4"]

    //Makes sure that previous requests information are not kept in weather.
    weather.setZipCode(null);   
    weather.setCity("");
	weather.setCoordinate(null, null);
	weather.setCityId(null);

    //If the user enters a 5-digit zip code, set the weather to be called to be the zipcode entered. Else, set the city to be returned.
    if(dLoc.match(/\d{5}/)){
        weather.setZipCode(dLoc);
    }else{
        weather.setCity(dLoc);
    }

    //Returns the weather forecast (forecast returns a 1 index array)
    forecast.find({search: dLoc, degreeType: 'F'}, (err, data) => {

        rainChance = data[0].forecast[1].precip; //Stores the current precipitation chance.
        wind = data[0].current.winddisplay; //Stores the current wind info.

        forecastData = [data[0].forecast[2], data[0].forecast[3], data[0].forecast[4]];     //Stores the next three day forecast array.

        //Makes each forecast date in the "MMM Do, YYYY" format. Example: "Nov 30th, 2001"
        forecastData.forEach(function(forecast){

            dateArray = forecast.date.split("-"); //
            
            let newForecastDate = new Date(dateArray[0], dateArray[1]-1, dateArray[2]);

            forecast.date = dateFormat.format(newForecastDate, 'MMM Do, YYYY');

        });


        weather.getAllWeather(function(err, areaWeatherData){
            areaWeatherData.rainChance = rainChance;
            areaWeatherData.wind = wind;
            response.render("locus.ejs", {areaWeatherData, forecastData});
        });
    });

}


exports.travelShow = (request, response) => {
    let dLoc = request.body.dLoc;
    let sLoc = request.body.sLoc;

    weather.setCoordinate(null, null);    //Makes sure that previous requests made with coordinates are not kept in weather.

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
          sMarker.coord = [cityDetails[0].lng,cityDetails[0].lat];
          map.addMarker(sMarker);
          dMarker.coord = [cityDetails[cityDetails.length-1].lng,cityDetails[cityDetails.length-1].lat]
          map.addMarker(dMarker);
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