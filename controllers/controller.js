const weather = require("openweather-apis");
const apiKey = "af9e6368dcce66f0f1162a446b5e0d9a";
weather.setAPPID(apiKey);
weather.setLang("en");
weather.setUnits('metric');

const forecast = require("weather-js");

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