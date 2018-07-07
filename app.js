const request = require('request');
const yargs = require('yargs');

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
// var encodedAddress = encodeURIComponent('amrita school of engineering coimbatore');
request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    // url: 'http://maps.googleapis.com/maps/api/geocode/json?address=amrita%20school%20of%20engineering%20coimbatore',
    json: true
}, (error, Response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    if (error) {
        console.log('unable to connect to server');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('invalid address');
    } else if (body.status === 'OK') {
        console.log(`add : ${body.results[0].formatted_address}`);
        console.log(`lat : ${body.results[0].geometry.location.lat}`);
        console.log(`lat : ${body.results[0].geometry.location.lng}`);
    } else if (body.status === 'OVER_QUERY_LIMIT') {
        console.log('Query over limit. Try again later.');
    } else {
        console.log('unable to connect');

    }
});