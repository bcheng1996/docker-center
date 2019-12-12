// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Properties from '../components/Properties';
import * as PropertyActions from '../actions/property';
import * as MapActions from '../actions/map';

function mapStateToProps(state){
  return {
    properties: state.property.properties
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...PropertyActions, ...MapActions}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Properties);