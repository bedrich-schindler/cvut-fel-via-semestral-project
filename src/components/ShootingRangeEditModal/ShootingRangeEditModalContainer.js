import { connect } from 'react-redux';
import {
  selectShootingRange,
  shootingRangeEdit,
  shootingRangeGet,
  shootingRangeGetAll,
} from '../../resources/shootingRange';
import Component from './ShootingRangeEditModalComponent';

const mapStateToProps = (state) => ({
  shootingRange: selectShootingRange(state),
});

const mapDispatchToProps = (dispatch) => ({
  shootingRangeEdit: (id, data) => dispatch(shootingRangeEdit(id, data)),
  shootingRangeGet: (id) => dispatch(shootingRangeGet(id)),
  shootingRangeGetAll: () => dispatch(shootingRangeGetAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
