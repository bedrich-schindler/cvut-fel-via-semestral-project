import { connect } from 'react-redux';
import {
  shootingRangeDelete,
  shootingRangeGetAll,
} from '../../resources/shootingRange';
import Component from './ShootingRangeDeleteModalComponent';

const mapDispatchToProps = (dispatch) => ({
  shootingRangeDelete: (id) => dispatch(shootingRangeDelete(id)),
  shootingRangeGetAll: () => dispatch(shootingRangeGetAll()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
