const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=8fAEBWJor7bFlIY9LjRL1iKhF7AKfMQG&location=${encodeURIComponent(address)}&maxResults=1`

  request(url, {json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body === undefined || body.info.statuscode !== 0) {
      callback('Invalid search query', undefined);
    } else {
      callback(undefined, {
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng,
        location: body.results[0].locations[0].adminArea5,
      })
    }
  })
}

module.exports = geocode;