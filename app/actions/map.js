export const CENTER_MAP = 'CENTER_MAP';
export const SELECT_PROPERTY = 'SELECT_PROPERTY';
export const RESIZE_MAP = 'RESIZE_MAP'

export function centerMap(lat, lng) {
    return {
        type: CENTER_MAP,
        center: {
            'lat': lat, 
            'lng': lng,
        }
    };
}

export function selectProperty(property) {
    return {
        type: SELECT_PROPERTY,
        property
    };
}

export function resizeMap(width='100vw', height='100vh') {
    return {
        type: RESIZE_MAP,
        width,
        height
    }
}

