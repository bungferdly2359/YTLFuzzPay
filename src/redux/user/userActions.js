import { getGeocode } from '../api';
import { FSArray } from '../../modules/fs-foundation';

export const actionTypes = {
  updateData: 'user::updateData'
};

export const updateData = data => ({
  type: actionTypes.updateData,
  payload: data
});

export const getCurrentLocation = () => dispatch =>
  new Promise((resolve, reject) => {
    this.navigator.geolocation.requestAuthorization();
    this.navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        dispatch(getGeocode(coords.latitude, coords.longitude))
          .then(geocode => {
            if (geocode) {
              const findValueWithType = type =>
                FSArray.findMap(geocode.results, item => FSArray.findMap(item.address_components, addr => ~addr.types.indexOf(type) && addr.long_name));
              const address = FSArray.findMap(['route', 'neighborhood', 'political', 'locality'], findValueWithType);
              const result = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                description: address
              };
              dispatch(updateData({ currentLocation: result }));
              resolve(result);
            }
            reject('No Geocode found');
          })
          .catch(error => {
            reject(error);
          });
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  });
