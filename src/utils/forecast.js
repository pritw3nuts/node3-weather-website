const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(lat) + '&lon='+ encodeURIComponent(lon) + '&appid=4415422f75c82c7ac07ac9eef97711d1'

    request({ url: url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `It is currently ${body.main.temp} degrees.`)
        }
    });

}

module.exports = forecast;