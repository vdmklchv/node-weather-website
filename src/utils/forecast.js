const request = require('postman-request');

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f13d1cfd7cd54488d508ece2a0f34306&query=${lat},${lng}`;

  request(url, { json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather portal.', undefined);
    } else if (body.error) {
      callback('Location incorrect. Please specify a different query.', undefined);
    } else {
      callback(undefined, body);
    }})
  }



module.exports = forecast;