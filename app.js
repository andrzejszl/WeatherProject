const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3000;

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "8e48f0e10544d6b72fb4aeba233ed325";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const location = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + location + " is: " + temp + " degree in Celsius</h1>")
            res.write("<p>The weather is currently " + desc + "</p>")
            res.write("<img src='" + imgURL + "'/>")
            res.send()
        })
    });

})

app.listen(port, function () {
    console.log("Server is running on port " + port);
})