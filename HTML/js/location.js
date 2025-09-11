export default class location{
    constructor(){
        this._name = "current location";
        this._lat = null;
        this._long = null;
        this._unit = "metric";
    }

    getName(){
        return this._name;
    }
    setName(name){
        this._name = name;
    }

    getLat(){
        return this._lat;
    }
    setLat(lat){
        this._lat = lat;
    }

    getLong(){
        return this._long;
    }
    setLong(long){
        this._long = long;
    }

    getUnit(){
        return this._unit;
    }
    setUnit(unit){
        this.__unit = unit;
    }
    toggleUnit(){
        this._unit = this._unit === "metric" ? "imperial" :"metric";
    }
}