import { connect } from 'react-redux';
import {
  foursquareSearchPlaces,
  selectFoursquarePlaces,
} from '../../resources/foursquare';
import { openStreetMapsGetDetail } from '../../resources/openStreetMaps';
import {
  selectShootingRange,
  shootingRangeEdit,
  shootingRangeGet,
  shootingRangeGetAll,
} from '../../resources/shootingRange';
import Component from './ShootingRangeEditModalComponent';

const mapStateToProps = (state) => ({
  foursquarePlaces: selectFoursquarePlaces(state),
  shootingRange: selectShootingRange(state),
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
