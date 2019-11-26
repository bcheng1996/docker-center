import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropertyModal from '../components/PropertyModal';
import * as ModalActions from '../actions/modal';
import * as SearchActions from '../actions/search';
import * as PropertyActions from '../actions/property';

function mapStateToProps(state) {
  const property = state.search.property
  return {
      visible: state.modal.visible,
      is_searching: state.search.is_searching,
      property: state.search.property,
      loading: state.property.loading,
      getFacts: getFacts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...ModalActions, ...SearchActions, ...PropertyActions}, dispatch);
}

function getFacts(property) {
  let res = [];
  const fact_keys = ['yearBuilt', 'lotSizeSqFt', 'useCode']
  const fact_labels = ['Year Built', 'Lot', 'Home Type']
  const fact_icons = ['calendar', 'appstore', 'home']

  for(let key in property['details']) {
    let fact = {}
    if(fact_keys.includes(key)) {
      fact['label'] = fact_labels[fact_keys.indexOf(key)];
      fact['icon'] = fact_icons[fact_keys.indexOf(key)];
      fact['value'] = property['details'][key]
      if(key == 'lotSizeSqFt') {
        fact['value'] += ' sqft'
      }
      res.push(fact)
    }
  }

  return res;
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyModal);
