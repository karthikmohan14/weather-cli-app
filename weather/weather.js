const request = require('request');

var getWeather = (apikey, results, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${apikey}/${results.latitude},${results.longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('unable to fetch weather');
        } else if (!error && response.statusCode === 200) {
            weatherResults = {
                currentTemperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            };
            callback(undefined, weatherResults);
        }
    });
};

module.exports = {
    getWeather
};