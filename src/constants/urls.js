export const urls = {
  baseURL: 'http://10.6.146.90',
  prodBaseURL: 'https://scb-conf-uat.2359media.net',
  geocodeURL: (lat, long) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false`
};
