import { connect } from 'react-redux';
import {
  shootingRangeDelete,
  shootingRangeGetAll,
  selectShootingRangeDeleteRequestState,
} from '../../resources/shootingRange';
import Component from './ShootingRangeDeleteModalComponent';

const mapStateToProps = (state) => ({
  shootingRangeDeleteRequestState: selectShootingRangeDeleteRequestState(state),
});

const mapDispatchToProps = (dispatch) => ({
  shootingRangeDelete: (id) => dispatch(shootingRangeDelete(id)),
  shootingRangeGetAll: () => dispatch(shootingRangeGetAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
