import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';

/**
 * Map the state to props.
 */
export const mapStateToProps = (state) => {
  return { game: state }
};

/**
 * Map the actions to props.
 */
export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});
