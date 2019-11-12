import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Map from '../components/Map.js';
import * as SearchActions from '../actions/search';

function mapStateToProps(state) {
    console.log("STATE", state)
  return {
      search_term: state.search.search_term,
      center: state.search.center
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
