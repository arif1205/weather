const API_Key = "8a4ab81002044f97456d2c11e6d30c5d";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

const weather = document.getElementById("weather");
const weatherForm = document.getElementById("weather-form");
const spinner = document.getElementById("spinner");
const weatherStatus = document.getElementById("weather-status");
const warningText = document.getElementById("warning-text");

weather.addEventListener("click", showCondition);
weatherForm.addEventListener("submit", showCondition);
window.addEventListener("load", showCondition);

function showCondition(e) {
	e.preventDefault();
	showSpinner(false);
	const city = document.getElementById("city");
	const url = `${BASE_URL}${city.value || "Dhaka"}&appid=${API_Key}`;
	fetch(url)
		.then((res) => {
			if (res.ok) {
				city.classList.remove("border-danger");
				warningText.classList.add("d-none");
				return res.json();
			} else {
				city.classList.add("border-danger");
				warningText.classList.remove("d-none");
				showSpinner(false);
				return Promise.reject("Not a valid city name");
			}
		})
		.then((data) => passData(data))
		.catch((e) => console.log("Error occured: " + e));

	city.value = "";
}

function passData(weatherInfo) {
	let icon = weatherInfo.weather[0].icon;
	if (icon.indexOf("d") == -1) icon = icon.slice(0, 2) + "d";
	else icon = icon;

	const IMG_URL = `http://openweathermap.org/img/wn/${icon || "02d"}@2x.png`;
	const data = {
		img_src: IMG_URL,
		city: weatherInfo.name,
		temp: (Number(weatherInfo.main.temp) - 273).toFixed(2),
		weatherCondition: weatherInfo.weather[0].description,
	};
	updateData(data);
}

function updateData(data) {
	const weatherImg = document.querySelector('[data-weather="icon"]');
	const weatherCity = document.querySelector('[data-weather="city"]');
	const weatherTemp = document.querySelector('[data-weather="temp"]');
	const weatherCondition = document.querySelector(
		'[data-weather="condition"]'
	);

	weatherImg.setAttribute("src", data.img_src);
	weatherCity.innerText = data.city;
	weatherTemp.innerText = data.temp;
	weatherCondition.innerText = data.weatherCondition;
	showSpinner(true);
}

function showSpinner(dataLoaded) {
	if (dataLoaded) {
		spinner.classList.toggle("d-none");
		weatherStatus.classList.toggle("d-none");
	} else {
		spinner.classList.toggle("d-none");
		weatherStatus.classList.toggle("d-none");
	}
}
