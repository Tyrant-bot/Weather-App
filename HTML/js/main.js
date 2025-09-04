import location from "./location.js";
import { displayErr, displayApiErr } from "./DOM.js";
import { setLocationObj, getHomeLocation, getApiCoords, getWeatherFromCoords, cleanText} from "./data.js";

const currLoc = new location();

const initApp = () => {
    const geoButton = document.getElementById("location");
    geoButton.addEventListener("click", getGeoWeather);
    const homeButton = document.getElementById("home");
    homeButton.addEventListener("click", getHomeWeather);
    const saveHomeLocation = document.getElementById("saveLocation");
    saveHomeLocation.addEventListener("click", setHomeLocation);
    const changeUnitButton = document.getElementById("changeUnits");
    changeUnitButton.addEventListener("click", toggleUnit);
    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", refreshWeather);
    const search = document.getElementById("searchBar__Form");
    search.addEventListener("submit", submitLocation);
}




const getGeoWeather = (event) => {
    if(!navigator.geolocation) {
        return geoErr();
    }
    navigator.geolocation.getCurrentPosition(geoSuccess, geoErr);
}

const geoErr = (errObj) => {
    const errorMsg = errObj ? errObj.message : "Allow this app to access your location";
    displayErr(errorMsg);
}

const geoSuccess = (position) => {
    const myCoords = {
        lat : position.coords.latitude,
        long : position.coords.longitude,
        name: `Lat : ${position.coords.latitude} Long : ${position.coords.longitude}`
    };
    setLocationObj(currLoc, myCoords);
    updateDisplayWeather(currLoc);
}

const getHomeWeather = (event) => {
    const homeLocation = getHomeLocation();
    if(!homeLocation && !event){
        return getGeoWeather;
    }
    if(!homeLocation && event.type === "click"){
        displayErr("No Saved Location Found!");
    }
    else if(homeLocation && !event){
        displayHomeLocation(homeLocation);
    }
}

const displayHomeLocation = (home) => {
    if(typeof home === "string"){
        const homeLocationJson = JSON.parse(home);
        const myHomeObj = {
            lat : homeLocationJson.lat,
            long : homeLocationJson.long,
            name : homeLocationJson.name,
            unit : homeLocationJson.unit
        };
        setLocationObj(currLoc, myHomeObj);
        updateDisplayWeather(currLoc);
    }
}
const setHomeLocation = () => {
    if(currLoc.getLat() && currLoc.getLong()){
        const location = {
            lat : currLoc.getLat(),
            long : currLoc.getLong(),
            name : currLoc.getName(),
            unit : currLoc.getUnit()
        };
        localStorage.setItem("savedLocation", JSON.stringify(location));
    }
}

const toggleUnit = () => {
    currLoc.toggleUnit();
    updateDisplayWeather(currLoc);
}

const refreshWeather = () => {
    updateDisplayWeather(currLoc);
}

const submitLocation = async (event) => {
    event.preventDefault();
    const text = document.getElementById("searchBar__Text").value;
    const entryText = cleanText(text);
    if(entryText.length === 0){
        return;
    }
    const coordsData = await getApiCoords(entryText, currLoc.getUnit());
    if(coordsData){
        if(coordsData.cod === 200){
            const myCoordsDataObj = {
                lat : coordsData.coord.lat,
                long : coordsData.coord.lon,
                name : coordsData.name ?`${coords,name}, ${coordsData.sys.country}` :  coordsData.name
            };
            setLocationObj(currLoc, myCoordsDataObj);
            updateDisplayWeather(currLoc);
        }
        else{
            displayApiErr(coordsData.message);
        }
    }
    else{
        displayErr("Connection Error");
    }
}

const updateDisplayWeather = async (locationObj) => {
    const weatherJSON = await getWeatherFromCoords(locationObj);
    console.log(weatherJSON);
    // if(weatherJSON){
    //     updateDisplay(weatherJSON);
    // }
}

document.addEventListener("DOMContentLoaded", initApp);