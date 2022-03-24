const weather = require("openweather-apis");

const apiKey = "af9e6368dcce66f0f1162a446b5e0d9a";
weather.setAPPID(apiKey);

exports.travel = (request, response) => {
    response.render("travel.ejs");
};

exports.locus = (request, response) => {
    response.render("locus.ejs");
};

exports.compare = (request, response) => {
    response.render("compare.ejs");
};

exports.locusShow = (request, response) =>{

}