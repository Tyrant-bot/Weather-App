import location from "./location.js";
import { displayErr } from "./DOM.js";
import { setLocationObj, getHomeLocation } from "./data.js";

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

const updateDisplayWeather = async (locationObj) => {
    console.log(locationObj);
}

document.addEventListener("DOMContentLoaded", initApp);