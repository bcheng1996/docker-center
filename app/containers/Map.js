import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Map from '../components/Map.js';
import * as SearchActions from '../actions/search';
import * as MapActions from '../actions/map';

function mapStateToProps(state) {
  return {
      search_term: state.search.search_term,
      properties: state.property.properties,
      center: state.map.center,
      property: state.search.property,
      selected_property: state.map.selected_property,
      selected_property_id: state.map.selected_property_id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...SearchActions, ...MapActions}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
