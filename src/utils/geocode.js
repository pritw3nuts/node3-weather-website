const request = require('request')

const geocode = (address, callback) => {
    
        const url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(address) + '&limit=5&appid=4415422f75c82c7ac07ac9eef97711d1'

        request({ url: url, json: true }, (error, {body}) => { 
            if (error) {
                callback('Unable to connect to weather service!',undefined)
            } else if (body.length === 0) {
                callback('Incorrect Input', undefined)
            } else {
                callback(undefined, { 
                    latitude : body[0].lat,
                    longitude : body[0].lon,
                    location : body[0].name,
                })
            }
        })

}  

module.exports = geocode;