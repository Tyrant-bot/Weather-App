const API_KEY = "8b95573c22cbe430aa1507a18bfbef84";

export const setLocationObj = (currLoc, myCoords) => {

    currLoc.setName(myCoords.name);
    currLoc.setLat(myCoords.lat);
    currLoc.setLong(myCoords.long);
    if(myCoords.unit){
        currLoc.setUnit(myCoords.unit);
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
    }
    catch (err) {
        console.error(err.stack);
    }
}

export const getWeatherFromCoords = async (locationObj) => {
    const lat = locationObj.getLat();
    const long = locationObj.getLong();
    const unit = locationObj.getUnit();
    const url = `api.openweathermap.org/data/2.5/forecast/daily/climate?lat=${lat}&lon=${long}&cnt={6}&units=${unit}&appid=${API_KEY}`;
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

export const cleanText = (text) => {
    const regex = / {2, }/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
}