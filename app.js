const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

const apikey = '8a583d6f0146df3fba9b9ce008214b3b';

// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'address to fetch weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });

// `https://api.darksky.net/forecast/${apikey}/${results.latitude},${results.longitude}`
var results = {
    latitude: 10.901849,
    longitude: 76.901651
};

request({
    url: `https://api.darksky.net/forecast/${apikey}/${results.latitude},${results.longitude}`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('unable to fetch weather');
    } else if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    }
});