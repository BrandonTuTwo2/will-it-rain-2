import express, { Router } from "express";
import serverless from "serverless-http";

require('dotenv').config()

const api = express();
const router = Router();



router.get("/hello", (req, res) => {
    console.log(process.env.test);
    console.log("HI ME")
    res.send({
    statusCode:200,
    hi: "Mom"
})});

router.post("/getForecast", async (req,res) => {
    //need to set lat and lon first
    let status = 400
    let lat = 0;
    let lon = 0
    let returnVal = "";
    const address = JSON.parse(req.body);
    //console.log(address);
    
    const latLonRaw = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=5&appid=${process.env.API_KEY}`)
    const latLon = await latLonRaw.json()

    //If the location exist/is valid then we get 5 day weather forcast, if not then we return a 400
    if(latLon) {
        const location = latLon[0]
        lat = location.lat
        lon = location.lon
        const weatherRaw = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`)
        const weather = await weatherRaw.json()
        status = 200
        console.log(weather)    
        returnVal = JSON.stringify(weather.list);
    } 
    res.send({
        statusCode:status,
        forecast : returnVal
    })
})

api.use("/api/", router);
export const handler = serverless(api);

