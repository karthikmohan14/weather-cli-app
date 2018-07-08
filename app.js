const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const apikey = '8a583d6f0146df3fba9b9ce008214b3b';

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var results = geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather(apikey, results, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                // console.log(JSON.stringify(weatherResults, undefined, 2));
                console.log(`Currently at ${results.address} it's ${weatherResults.currentTemperature} °F with apparent temperature ${weatherResults.apparentTemperature} °F`);

            }
        });
    }
});

// var results = {
//     latitude: 10.901849,
//     longitude: 76.901651
// };