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

request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=amrita%20school%20of%20engineering%20coimbatore',
    json: true
}, (error, Response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
    console.log(`add : ${body.results[0].formatted_address}`);
    console.log(`lat : ${body.results[0].geometry.location.lat}`);
    console.log(`lat : ${body.results[0].geometry.location.lng}`);
});