if (typeof Number.prototype.toRadians === 'undefined') {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  };
}

export const LocationHelper = {
  getLatitude: coords => coords._latitude || coords.latitude,
  getLongitude: coords => coords._longitude || coords.longitude,
  getDistance: (coords1, coords2) => {
    var lat1 = LocationHelper.getLatitude(coords1);
    var lon1 = LocationHelper.getLongitude(coords1);
    var lat2 = LocationHelper.getLatitude(coords2);
    var lon2 = LocationHelper.getLongitude(coords2);
    var R = 6371e3;
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2 - lat1).toRadians();
    var Δλ = (lon2 - lon1).toRadians();

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c / 1000;
    return d;
  }
};
