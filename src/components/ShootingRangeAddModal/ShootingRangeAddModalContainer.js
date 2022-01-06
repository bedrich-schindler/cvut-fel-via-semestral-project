import { connect } from 'react-redux';
import {
  shootingRangeAdd,
  shootingRangeGetAll,
} from '../../resources/shootingRange';
import {
  foursquareSearchPlaces,
  selectFoursquarePlaces,
} from '../../resources/foursquare';
import Component from './ShootingRangeAddModalComponent';

const mapStateToProps = (state) => ({
  foursquarePlaces: selectFoursquarePlaces(state),
});

const mapDispatchToProps = (dispatch) => ({
  foursquareSearchPlaces: (data) => dispatch(foursquareSearchPlaces(data)),
  shootingRangeAdd: (data) => dispatch(shootingRangeAdd(data)),
  shootingRangeGetAll: () => dispatch(shootingRangeGetAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
