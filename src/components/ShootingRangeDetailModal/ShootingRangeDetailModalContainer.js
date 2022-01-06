import { connect } from 'react-redux';
import {
  foursquareGetPlace,
  selectFoursquarePlace,
} from '../../resources/foursquare';
import {
  selectShootingRange,
  shootingRangeGet,
} from '../../resources/shootingRange';
import Component from './ShootingRangeDetailModalComponent';

const mapStateToProps = (state) => ({
  foursquarePlace: selectFoursquarePlace(state),
  shootingRange: selectShootingRange(state),
});

const mapDispatchToProps = (dispatch) => ({
  foursquareGetPlace: (fsqId) => dispatch(foursquareGetPlace(fsqId)),
  shootingRangeGet: (id) => dispatch(shootingRangeGet(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
