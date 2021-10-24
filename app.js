const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("index", { weatherData: false });
});

app.post("/", (req, res) => {
	const apiKey = process.env.OPEN_WEATHER_API_KEY;
	const zipCode = req.body.zipcode;
	const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`;
	let weatherData = "";

	axios
		.get(url)
		.then(function (response) {
			// handle success
			console.log(response.data);
			weatherData = response.data;
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			res.render("index", { weatherData: weatherData });
		});
});

app.listen(3000, () => console.log("Server running on port 3000."));
