const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        // var encodedAddress = encodeURIComponent('amrita school of engineering coimbatore');
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            // url: 'http://maps.googleapis.com/maps/api/geocode/json?address=amrita%20school%20of%20engineering%20coimbatore',
            json: true
        }, (error, Response, body) => {
            // console.log(JSON.stringify(body, undefined, 2));
            if (error) {
                reject('unable to connect to server');
                // console.log('unable to connect to server');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('invalid address');
                // console.log('invalid address');
            } else if (body.status === 'OVER_QUERY_LIMIT') {
                reject('Query over limit. Try again later.');
                // console.log('Query over limit. Try again later.');
            } else if (body.status === 'OK') {
                // console.log(`add : ${body.results[0].formatted_address}`);
                // console.log(`lat : ${body.results[0].geometry.location.lat}`);
                // console.log(`lat : ${body.results[0].geometry.location.lng}`);
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            } else {
                console.log('unable to connect');
            }
        });
    });
};

geocodeAddress('00').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});