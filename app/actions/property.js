export const GETTING_ALL_PROPERTIES = "GETTING_ALL_PROPERTIES";
export const ADDING_PROPERTY = "ADDING_PROPERTY";
export const ADDED_PROPERTY = "ADDED_PROPERTY";
export const RECIEVE_ALL_PROPERTIES = "RECIEVE_ALL_PROPERTIES";
export const FAILED_GETTING_PROPERTY = "FAILED_GETTING_PROPERTY";
export const SET_FILTERS = "SET_FILTERS";

import * as Api from '../api/api';

export function addingProperty() {
    return {
        type: ADDING_PROPERTY
    }
}

export function addedProperty(property) {
    return {
        type: ADDED_PROPERTY,
        property
    }
}

export function gettingProperties() {
    return {
        type: GETTING_ALL_PROPERTIES
    }
}

export function recieveAllProperties(properties) { 
    return {
        type: RECIEVE_ALL_PROPERTIES,
        properties
    }
}

export function propertyFailed() {
    return {
        type: FAILED_GETTING_PROPERTY,
    }
}

export function setFilters(filters) {
    return {
        type: SET_FILTERS,
        filters
    }
}

export function addProperty(property) {
    return function(dispatch) {

        dispatch(addingProperty())

        Api.addProperty(property)
        .then(res => {
            if(res) {
                dispatch(addedProperty(JSON.parse(res)))
            } else {
                dispatch(propertyFailed())
            }
        })
    }
}


export function getAllProperties(filters=[]) {
    return function(dispatch) {
        dispatch(gettingProperties())

        Api.getProperties(filters)
        .then(res => {
            if(res) {
                dispatch(recieveAllProperties(JSON.parse(res)))
            }else {
                // failed
                dispatch(propertyFailed())
            }
        })
    }
}