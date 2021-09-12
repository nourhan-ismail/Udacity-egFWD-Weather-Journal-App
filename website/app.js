/* Global Variables */

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear();

const apiKey = "42066e6c434c983442adec9359e5ee6f";

const baseURL = "https://api.openweathermap.org/data/2.5/weather";

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

// TODO: Create async functions for fetch api requests

// Event listener for click event on generate button
document.getElementById("generate").addEventListener("click", () => {
  const zip = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;

  //Validate inputs and if returns false (invalid), immediately return
  if (isFormValid(zip, userFeelings) === false) {
    return;
  }

  // TODO: Call async functions with promise chain
});
