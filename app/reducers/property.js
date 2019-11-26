import { 
    ADDING_PROPERTY, 
    ADDED_PROPERTY,
    GET_ALL_PROPERTIES, 
    RECIEVE_ALL_PROPERTIES, 
    FAILED_GETTING_PROPERTY,
} from '../actions/property';
import { Action } from './types';

export const initialState = {
    properties: [],
    add_success: false,
    get_all_properties_success: false,
    loading: false,
}

export default function property(state: Dict = initialState, action: Action) {
    switch(action.type) {
        case ADDING_PROPERTY: {
            return Object.assign({}, state, {
                loading: true,
                add_success: false,
            })
        }

        case ADDED_PROPERTY: {
            return Object.assign({}, state, {
                loading: false,
                add_success: true,
                properties: state.properties.concat(action.property)
            })
        }

        case GET_ALL_PROPERTIES: {
            return Object.assign({}, state, {
                get_all_properties_success: false,
                loading: true
            })
        }

        case RECIEVE_ALL_PROPERTIES: {
            return Object.assign({}, state, {
                get_all_properties_success: true,
                loading: false,
                properties: action.properties
            })
        }

        case FAILED_GETTING_PROPERTY: {
            return Object.assign({}, state, {
                loading: false,
                get_all_properties_success: false
            })
        }

        default:
            return state;
    }

}

