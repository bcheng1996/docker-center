import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchHeader from '../components/SearchHeader';
import * as SearchActions from '../actions/search';

function mapStateToProps(state) {
  return {
      search_term: state.search_term
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader);
