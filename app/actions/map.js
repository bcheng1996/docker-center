export const CENTER_MAP = 'CENTER_MAP';
export const SELECT_PROPERTY = 'SELECT_PROPERTY';

export function centerMap(lat, lng) {
    return {
        type: CENTER_MAP,
        center: {
            'lat': lat, 
            'lng': lng,
        }
    }
}


export function selectProperty(property) {
    return {
        type: SELECT_PROPERTY,
        property
    }
}

