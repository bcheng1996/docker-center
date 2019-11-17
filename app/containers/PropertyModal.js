import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropertyModal from '../components/PropertyModal';
import * as ModalActions from '../actions/modal';
import * as SearchActions from '../actions/search';

function mapStateToProps(state) {
  return {
      visible: state.modal.visible,
      is_searching: state.search.is_searching,
      property: state.search.property
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...ModalActions, ...SearchActions}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyModal);
