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