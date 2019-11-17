// @flow
import { RECIEVE_SEARCH, SEARCHING, CENTER_MAP } from '../actions/search';
import type { Action } from './types';

export const initialState = {
  is_searching: false,
  search_term: "",
  property: {},
  center: {lat: "38.908496", lng: "-77.180312"}
}

export default function search(state: Dict = initialState, action: Action) {
  switch (action.type) {
    case SEARCHING: {
      return Object.assign({}, state, {
        is_searching: true
      })
    }
    case RECIEVE_SEARCH:
      return Object.assign({}, state, {
        property: action.property,
        is_searching: false
      });

    case CENTER_MAP:
      return Object.assign({}, state, {
        center: action.center,
      })
      
    default:
      return state;
  }
}
