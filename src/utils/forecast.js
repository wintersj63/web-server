const request = require('request')

const forecast =  (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d708b084721589e833355a187ddde094&query=' + latitude + ', ' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        // Add response and error code
        if(error){
            callback(error.code + error.type, undefined)
        }else if(body.error){
            callback('Error code: ' + response.body.error.code +  ', ' + response.body.error.info, undefined)
        }else {
            callback(undefined, 
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + '. It feels like ' + body.current.feelslike + ' degrees out.', 
            )
        }
    })

}


module.exports = forecast