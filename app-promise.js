const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

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
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    //success handler
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Invalid address')
    } else
    if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('Query over limit. Try again later.');
    }
    var wlat = response.data.results[0].geometry.location.lng;
    var wlng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${apikey}/${wlat},${wlng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {

    // console.log(JSON.stringify(response.data, undefined, 2));
    var cTemperature = response.data.currently.temperature;
    var aTemperature = response.data.currently.apparentTemperature;
    console.log(`Currently it's ${cTemperature} °C with apparent temperature ${aTemperature} °C`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('unable to connect to api servers');
    } else {
        console.log(e.message);
    }
});