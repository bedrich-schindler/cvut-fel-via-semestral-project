import { connect } from 'react-redux';
import {
  shootingRangeGetAll,
  selectShootingRanges,
  selectShootingRangeGetAllRequestState,
} from '../../resources/shootingRange';
import Component from './LayoutComponent';

const mapStateToProps = (state) => ({
  shootingRangeGetAllRequestState: selectShootingRangeGetAllRequestState(state),
  shootingRanges: selectShootingRanges(state),
});

const mapDispatchToProps = (dispatch) => ({
  shootingRangeGetAll: () => dispatch(shootingRangeGetAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
