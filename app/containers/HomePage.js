// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ModalActions from '../actions/modal';

function mapStateToProps(state){
  return {
    visible: state.modal.visible
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ModalActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);