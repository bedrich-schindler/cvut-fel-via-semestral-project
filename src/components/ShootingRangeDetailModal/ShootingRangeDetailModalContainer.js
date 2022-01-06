import { connect } from 'react-redux';
import {
  foursquareGetPlace,
  selectFoursquareGetPlaceRequestState,
  selectFoursquarePlace,
} from '../../resources/foursquare';
import {
  selectShootingRange,
  selectShootingRangeGetRequestState,
  shootingRangeGet,
} from '../../resources/shootingRange';
import Component from './ShootingRangeDetailModalComponent';

const mapStateToProps = (state) => ({
  foursquareGetPlaceRequestState: selectFoursquareGetPlaceRequestState(state),
  foursquarePlace: selectFoursquarePlace(state),
  shootingRange: selectShootingRange(state),
  shootingRangeGetRequestState: selectShootingRangeGetRequestState(state),
});

const mapDispatchToProps = (dispatch) => ({
  foursquareGetPlace: (fsqId) => dispatch(foursquareGetPlace(fsqId)),
  shootingRangeGet: (id) => dispatch(shootingRangeGet(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
