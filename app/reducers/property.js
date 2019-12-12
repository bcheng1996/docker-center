import { 
    ADDING_PROPERTY, 
    ADDED_PROPERTY,
    GET_ALL_PROPERTIES, 
    RECIEVE_ALL_PROPERTIES, 
    FAILED_GETTING_PROPERTY,
    SET_FILTERS
} from '../actions/property';
import { Action } from './types';

export const initialState = {
    properties: [],
    property_ids: [],
    add_success: false,
    get_all_properties_success: false,
    loading: false,
    filters: {},
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
                properties: state.properties.concat(action.property),
                property_ids: state.property_ids.concat(action.property.id)
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
                properties: action.properties,
                property_ids: action.properties.map((val) => val.id)
            })
        }

        case FAILED_GETTING_PROPERTY: {
            return Object.assign({}, state, {
                loading: false,
                get_all_properties_success: false
            })
        }

        case SET_FILTERS: {
            return Object.assign({}, state, {
                filters: action.filters
            })
        }

        default:
            return state;
    }

}

