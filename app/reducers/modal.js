import { SHOW_PROPERTY_MODAL, HIDE_PROPERTY_MODAL} from '../actions/modal';
import type { Action } from './types';

export const initialState = {
    visible: false
}


export default function modal(state: Dict = initialState, action: Action) {
    switch(action.type){
        case SHOW_PROPERTY_MODAL: {
            return Object.assign({}, state, {
                visible: true
            })
        }

        case HIDE_PROPERTY_MODAL: {
            return Object.assign({}, state, {
                visible: false
            })
        }

        default:
            return state
            
    }
}