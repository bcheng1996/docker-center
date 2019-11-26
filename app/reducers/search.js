// @flow
import { RECIEVE_SEARCH, SEARCHING, CENTER_MAP, SEARCH_FAIL, EMPTY_SEARCH} from '../actions/search';
import type { Action } from './types';

export const initialState = {
  is_searching: false,
  search_term: "",
  property: {},
  search_success: false,
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
        search_success: true,
        is_searching: false
      });

    case SEARCH_FAIL:
      return Object.assign({}, state, {
        property: action.property,
        search_success: false,
        property: state.property,
        is_searching: false
      });

    case CENTER_MAP:
      return Object.assign({}, state, {
        center: action.center,
      })

    case EMPTY_SEARCH:
      return Object.assign({}, state, {
        property: {}
      })
    
      
    default:
      return state;
  }
}
