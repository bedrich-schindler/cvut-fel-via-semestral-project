import { connect } from 'react-redux';
import {
  shootingRangeAdd,
  shootingRangeGetAll,
} from '../../resources/shootingRange';
import Component from './ShootingRangeAddModalComponent';

const mapDispatchToProps = (dispatch) => ({
  shootingRangeAdd: (data) => dispatch(shootingRangeAdd(data)),
  shootingRangeGetAll: () => dispatch(shootingRangeGetAll()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
