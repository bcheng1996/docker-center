// @flow
import { CENTER_MAP, SELECT_PROPERTY } from '../actions/map';
import type { Action } from './types';

const initialState = {
    center: {lat: "38.908496", lng: "-77.180312"},
    selected_property: undefined,
}

export default function map(state: Dict = initialState, action: Action) {
  switch (action.type) {
    case CENTER_MAP:
        return Object.assign(state, {}, {
            center: action.center
        })
    
    case SELECT_PROPERTY:
        return Object.assign(state, {}, {
            selected_property: action.property
        })

    default:
        return initialState;
  }
}
