import Immutable from 'immutable';

export default Immutable.fromJS({
  data: {
    foursquarePlacePhotos: null,
    foursquarePlaceTips: null,
    foursquarePlaces: null,
  },
  requestsState: {
    foursquareGetPlace: null,
    foursquareSearchPlaces: null,
  },
});
