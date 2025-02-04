let allCurrencyData;

const firstCurrency = document.querySelector("#firstCurrencySelect");
const secondCurrency = document.querySelector("#secondCurrencySelect");
const firstCurrencyInput = document.querySelector("#firstCurrencyInput");
const secondCurrencyInput = document.querySelector("#secondCurrencyInput");
const firstCurrencySelect = document.querySelector("#firstCurrencySelect");
const secondCurrencySelect = document.querySelector("#secondCurrencySelect");


let firstValue = 1;
let firstCurrCode = "USD";
let secondCurrCode = "INR";

firstCurrencyInput.addEventListener("change", function (e) {
    e.preventDefault();
    firstValue = firstCurrencyInput.value;
    main();
});

firstCurrencySelect.addEventListener("change", function (e) {
    e.preventDefault();
    firstCurrCode = firstCurrencySelect.value;
    main();
});

secondCurrencySelect.addEventListener("change", function (e) {
    e.preventDefault();
    secondCurrCode = secondCurrencySelect.value;
    main();
});



function addOptions(parent, allCurrencyCode) {
    for (let i = 0; i < allCurrencyCode.length; i++) {
        const newOption = document.createElement("option");
        newOption.value = allCurrencyCode[i];
        newOption.textContent = allCurrencyCode[i];
        parent.appendChild(newOption);
    }
};

function convertCurrency(amount, currCode1, currCode2) {
    const rate1 = allCurrencyData.data[currCode1];
    const rate2 = allCurrencyData.data[currCode2];
    return amount * rate2 / rate1;
};

function main() {
    addOptions(firstCurrency, Object.keys(allCurrencyData.data));
    addOptions(secondCurrency, Object.keys(allCurrencyData.data));
    let answer = convertCurrency(firstValue, firstCurrCode, secondCurrCode);
    firstCurrencyInput.value = firstValue;
    secondCurrencyInput.value = answer;

    for (let option of firstCurrencySelect.options) {
        if (option.value === firstCurrCode) {
            option.selected = true;
            break;
        }
    }

    for (let option of secondCurrencySelect.options) {
        if (option.value === secondCurrCode) {
            option.selected = true;
            break;
        }
    }
};

async function getCurrencyData() {
    try {
        const response = await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_NnNlLA6SLWaCNzqEfckTItT2nMEzKx1BQ578d4Yq");
        const result = await response.json();
        if (response.ok) {
            allCurrencyData = result;
            main();
        }
    }
    catch (error) {
        console.log(error)
        console.error("Unable to get data, something went wrong!!!");
    }
};

getCurrencyData();