import { connect } from 'react-redux';
import {
  selectShootingRanges,
} from '../../resources/shootingRange';
import Component from './ListPageComponent';

const mapStateToProps = (state) => ({
  shootingRanges: selectShootingRanges(state),
});

export default connect(
  mapStateToProps,
  null,
)(Component);
