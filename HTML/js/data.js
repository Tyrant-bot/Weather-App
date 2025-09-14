const API_KEY = "8b95573c22cbe430aa1507a18bfbef84";

export const setLocationObj = (currLoc, myCoords) => {
    const { lat, long, name, unit } = myCoords;
    currLoc.setName(name);
    currLoc.setLat(lat);
    currLoc.setLong(long);
    if(unit){
        currLoc.setUnit(unit);
    }
}

export const getHomeLocation = () => {

    return localStorage.getItem("savedLocation");
}

export const getApiCoords = async (text, unit) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=${unit}&appid=${API_KEY}`;
    const encodedUrl = encodeURI(url);
    try{
        const dataStream = await fetch(encodedUrl);
        const dataJSON = dataStream.json();
        return dataJSON;
    }
    catch (err) {
        console.error(err.stack);
    }
}

export const getSixDayWeather = async (text) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=1&appid=${API_key}`;
    const encodedUrl = encodeURI(url);
    try{
        const dataStream = await fetch(encodedUrl);
        const dataJSON = dataStream.json();
        return dataJSON;
    }
    catch (err) {
        console.error(err.stack);
    }
}


export const getWeatherFromCoords = async (locationObj) => {
    const lat = locationObj.getLat();
    const long = locationObj.getLong();
    const unit = locationObj.getUnit();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=${API_KEY}`;
    const encodedUrl = encodeURI(url);
    try{
        const weatherStream = await fetch(encodedUrl);
        const weatherJSON = await weatherStream.json();
        return weatherJSON;
    }
    catch (err) {
        console.error(err);
    }
}

export const getSixDayWeatherFromCoords = async (locationObj) => {
    const lat = locationObj.getLat();
    const long = locationObj.getLong();
    const unit = locationObj.getUnit();
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,weather_code`;
    if(unit === "imperial"){
        url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit`
    }
    const encodedUrl = encodeURI(url);
    try{
        const weatherStream = await fetch(encodedUrl);
        const sixDayWeatherJSON = await weatherStream.json();
        return sixDayWeatherJSON;
    }
    catch (err) {
        console.error(err);
    }
}

export const cleanText = (text) => {
    const regex = / {2, }/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
}