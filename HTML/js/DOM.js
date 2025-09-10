
export const displayErr = (msg) => {
    updateWeatherHeader(msg);
}

export const displayApiErr = (message) => {
    const properMsg = toProperCase(message);
    updateWeatherHeader(properMsg);
}
const toProperCase = (text) => {
    const words = text.split(" ");
    const properWords = words.map(word => {
        word.charAt(0).toUpperCase() + word.slice(1)
    });
    return properWords.join(" ");
}

const updateWeatherHeader = (msg) => {
    const h2 = document.getElementById("currentLocation");
    h2.textContent = msg;
}

export const updateDisplay = (weatherJSON, locationObj) => {
    clearDisplay();
    const weatherClass = getWeatherClass(weatherJSON);
    setBGImg(weatherClass);
    updateWeatherHeader(locationObj.getName());
    const currentConditionsArray = createCurrentConditionsDiv(weatherJSON, locationObj.getUnit());
    displayCurrentConditions(currentConditionsArray);
}

const clearDisplay = () => {
    const currentWeatherConditions = document.getElementById("currentWeather__Conditions");
    deleteContents(currentWeatherConditions);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while(child){
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const getWeatherClass = (weatherJSON) => {
    const firstTwoChars = weatherJSON.weather[0].icon.slice(0,2);
    const lastChar = weatherJSON.weather[0].icon.slice(2);
    const weatherLookUp = {
        "09": "snow",
        "10": "rain",
        "11": "rain",
        "13": "snow",
        "50": "fog"
    };
    let weatherClass;
    if(weatherLookUp[firstTwoChars]){
        weatherClass = weatherLookUp[firstTwoChars];
    }
    else if(lastChar === "d"){
        weatherClass = "cloud";
    }
    else{
        weatherClass = "night";
    }
    return weatherClass;
};

const setBGImg = (weatherClass) => {
    document.documentElement.classList.add(weatherClass);
    document.documentElement.classList.forEach(img => {
        if(img !== weatherClass){
            document.documentElement.classList.remove(img);
        }
    });
};

const createCurrentConditionsDiv = (weatherObj, unit) => {
    const tempUnit = unit === "metric" ? "C" : "F";
    const windUnit = unit === "metric" ? "m/s" : "mph";
    const icon = createMainImgDiv(weatherObj.weather[0].icon, weatherObj.weather[0].description);
    const temp = createElem("div", "temp", `${Math.round(Number(weatherObj.main.temp))}°`);
    const properDesc = toProperCase(weatherObj.weather[0].description);
    const desc = createElem("div", "desc", properDesc);
    const realFeel = createElem("div", "feel", `Real Feel ${Math.round(Number(weatherObj.main.feels_like))}°`);
    const maxTemp = createElem("div", "maxTemp", `Highest ${Math.round(Number(weatherObj.main.temp_max))}°`);
    const minTemp = createElem("div", "minTemp", `Lowest ${Math.round(Number(weatherObj.main.temp_min))}°`);
    const humidity = createElem("div", "humidity", `Humidity ${Math.round(Number(weatherObj.main.humidity))}%`);
    const windSpeed = createElem("div", "wind", `wind ${Math.round(Number(weatherObj.wind.speed))} ${windUnit}`);
    return [icon, temp, desc, realFeel, maxTemp, minTemp, humidity, windSpeed];
};

const createMainImgDiv = (icon, desc) => {
    const iconDiv = createElem("div", "icon");
    iconDiv.id = "icon";
    const faIcon = transformIconTofa(icon);
    faIcon.ariaHidden = true;
    faIcon.title = desc;
    iconDiv.appendChild(faIcon);
    return iconDiv;
};

const createElem = (elemType, className, text, unit) => {
    const div = document.createElement(elemType);
    div.className = className;
    if(text){
        div.textContent = text;
    }
    if(className === "temp"){
        const UnitDiv = document.createElement("div");
        UnitDiv.classList.add("unit");
        UnitDiv.textContent = unit;
        div.appendChild(UnitDiv);
    }
    return div;
};

const transformIconTofa = (icon) => {
    const i = document.createElement("i");
    const firstTwoChars = icon.slice(0, 2);
    const lastChar = icon.slice(2);
    switch (firstTwoChars) {
        case "01":
            if(lastChar === "d"){
                i.classList.add("far", "fa-sun");
            }
            else{
                i.classList.add("far", "fa-moon");
            }
            break;
        case "02":
            if(lastChar === "d"){
                i.classList.add("fas", "fa-cloud-sun");
            }
            else{
                i.classList.add("fas", "fa-cloud-moon");
            }
            break;
        case "03":
            i.classList.add("fas", "fa-cloud");
            break;
        case "04":
            i.classList.add("fas", "fa-cloud-meatball");
            break;
        case "09":
            i.classList.add("fas", "fa-cloud-rain");
            break;
        case "10":
            if(lastChar === "d"){
                i.classList.add("fas", "fa-cloud-sun-rain");
            }
            else{
                i.classList.add("fas", "fa-cloud-moon-rain");
            }
            break;
        case "11":
            i.classList.add("fas", "fa-poo-storm");
            break;
        case "13":
            i.classList.add("far", "fa-snowflake");
            break;
        case "50":
            i.classList.add("fas", "fa-smog");
            break;
        default:
            i.classList.add("far", "fa-question-circle");
  }
  return i;
};

const displayCurrentConditions = (currentConditionsArray) => {
    const currentConditionsContainer = document.getElementById("currentWeather__Conditions");
    currentConditionsArray.forEach(currentConditions => {
        currentConditionsContainer.appendChild(currentConditions);
    });
};