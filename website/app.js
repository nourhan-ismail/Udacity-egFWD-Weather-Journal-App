/* Global Variables */

// Create a new date instance dynamically with JS
const currentDate = new Date().toUTCString();

const apiKey = "42066e6c434c983442adec9359e5ee6f";

const baseURL = "https://api.openweathermap.org/data/2.5/weather";

const tempUnit = "metric";

/*
    USER INPUT VALIDATION METHODS
*/
const stringIsEmpty = (text) => {
  if (text === "") {
    return true;
  }
  return false;
};

const isFormValid = (zipCode, feelings) => {
  const zipINT = parseInt(zipCode);
  if (stringIsEmpty(zipCode) || stringIsEmpty(feelings)) {
    alert("ZIP Code and feelings cannot be empty!");
    return false;
  } else if (zipCode.length != 5 || isNaN(zipINT)) {
    alert(
      "Please make sure you entered a US ZIP Code. A US ZIP Code consists of 5 digits."
    );
    return false;
  }
  return true;
};

// An asynchronus function calling fetch function to send an HTTP GET request to OpenWeatherMap API
const fetchWeatherData = async (baseURL, zip, apiKey) => {
  const url = `${baseURL}?zip=${zip}&appid=${apiKey}&units=${tempUnit}`;
  try {
    const response = await fetch(url);
    if (response.ok === false) {
      // To handle errors and display them to the user by alert, we throw a custom error message
      throw new Error(
        "failed to fetch temperature from OpenWeatherMap API. Please ensure that the ZIP code is a legit US ZIP Code."
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};

// An asynchronus function calling fetch function to send an HTTP POST Request to the node local server to set its latest entry.
const postLatestEntry = async (url, data) => {
  const response = fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return response;
};

// An asynchronus function calling fetch function to send an HTTP GET Request to the node local server to fetch the latest entry and then update the page content.
const setLatestEntry = async (url) => {
  const response = await fetch(url);
  const { date, temp, feeling } = await response.json();
  document.getElementById("date").innerHTML = date;
  document.getElementById("temp").innerHTML = `${temp} C`;
  document.getElementById("content").innerHTML = feeling;
};

// Event listener for click event on generate button
document.getElementById("generate").addEventListener("click", () => {
  const zip = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;

  //Validate inputs and if returns false (invalid), immediately return
  if (isFormValid(zip, userFeelings) === false) {
    return;
  }

  fetchWeatherData(baseURL, zip, apiKey).then((data) => {
    const entry = {
      temp: data.main.temp,
      date: currentDate,
      feeling: userFeelings
    };
    return postLatestEntry("/latest-entry", entry).then((data) => {
      setLatestEntry("/latest-entry");
    });
  });
});
