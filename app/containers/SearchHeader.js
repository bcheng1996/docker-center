import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import * as SearchActions from '../actions/search';
import * as ModalActions from '../actions/modal';

function mapStateToProps(state) {
    return {
        search_term: state.search.search_term 
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...SearchActions, ...ModalActions}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader);
