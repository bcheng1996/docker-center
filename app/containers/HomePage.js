// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
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
)(Home);