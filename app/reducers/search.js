// @flow
import { RECIEVE_SEARCH } from '../actions/search';
import type { Action } from './types';

export const initialState = {
  search_term: "",
  property: {},
  center: {lat: "38.908496", lng: "-77.180312"}
}

export default function search(state: Dict = initialState, action: Action) {
  switch (action.type) {
    case RECIEVE_SEARCH:
      return Object.assign({}, state, {
        property: action.property,
        center: {'lat': action.property['address'][0]['latitude'][0], 'lng': action.property['address'][0]['longitude'][0]}
      });
    default:
      return state;
  }
}
