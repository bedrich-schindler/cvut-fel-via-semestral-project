import { connect } from 'react-redux';
import {
  foursquareSearchPlaces,
  selectFoursquarePlaces,
  selectFoursquareSearchPlacesRequestState,
} from '../../resources/foursquare';
import { openStreetMapsGetDetail } from '../../resources/openStreetMaps';
import {
  selectShootingRange,
  selectShootingRangeEditRequestState,
  selectShootingRangeGetRequestState,
  shootingRangeEdit,
  shootingRangeGet,
  shootingRangeGetAll,
} from '../../resources/shootingRange';
import Component from './ShootingRangeEditModalComponent';

const mapStateToProps = (state) => ({
  foursquarePlaces: selectFoursquarePlaces(state),
  foursquareSearchPlacesRequestState: selectFoursquareSearchPlacesRequestState(state),
  shootingRange: selectShootingRange(state),
  shootingRangeEditRequestState: selectShootingRangeEditRequestState(state),
  shootingRangeGetRequestState: selectShootingRangeGetRequestState(state),
});

const mapDispatchToProps = (dispatch) => ({
  foursquareSearchPlaces: (data) => dispatch(foursquareSearchPlaces(data)),
  openStreetMapsGetDetail: (data) => dispatch(openStreetMapsGetDetail(data)),
  shootingRangeEdit: (id, data) => dispatch(shootingRangeEdit(id, data)),
  shootingRangeGet: (id) => dispatch(shootingRangeGet(id)),
  shootingRangeGetAll: () => dispatch(shootingRangeGetAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
