import { connect } from 'react-redux';
import {
  foursquareSearchPlaces,
  selectFoursquarePlaces,
  selectFoursquareSearchPlacesRequestState,
} from '../../resources/foursquare';
import {
  openStreetMapsGetDetail,
} from '../../resources/openStreetMaps';
import {
  shootingRangeAdd,
  shootingRangeGetAll,
  selectShootingRangeAddRequestState,
} from '../../resources/shootingRange';
import Component from './ShootingRangeAddModalComponent';

const mapStateToProps = (state) => ({
  foursquarePlaces: selectFoursquarePlaces(state),
  foursquareSearchPlacesRequestState: selectFoursquareSearchPlacesRequestState(state),
  shootingRangeAddRequestState: selectShootingRangeAddRequestState(state),
});

const mapDispatchToProps = (dispatch) => ({
  foursquareSearchPlaces: (data) => dispatch(foursquareSearchPlaces(data)),
  openStreetMapsGetDetail: (data) => dispatch(openStreetMapsGetDetail(data)),
  shootingRangeAdd: (data) => dispatch(shootingRangeAdd(data)),
  shootingRangeGetAll: () => dispatch(shootingRangeGetAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
