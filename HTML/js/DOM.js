
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