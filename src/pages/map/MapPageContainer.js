import { connect } from 'react-redux';
import {
  shootingRangeGet,
  selectShootingRange,
  selectShootingRangeGetRequestState,
  selectShootingRanges,
} from '../../resources/shootingRange';
import Component from './MapPageComponent';

const mapStateToProps = (state) => ({
  shootingRange: selectShootingRange(state),
  shootingRangeGetRequestState: selectShootingRangeGetRequestState(state),
  shootingRanges: selectShootingRanges(state),
});

const mapDispatchToProps = (dispatch) => ({
  shootingRangeGet: (id) => dispatch(shootingRangeGet(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
