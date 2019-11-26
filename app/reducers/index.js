// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import search from './search';
import property from './property';
import modal from './modal';
import map from './map';


export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    search,
    property,
    modal,
    map
  });
}
