export const SHOW_PROPERTY_MODAL = 'SHOW_PROPERTY_MODAL';
export const HIDE_PROPERTY_MODAL = 'HIDE_PROPERTY_MODAL';

export function showPropertyModal() {
    return {
        type: SHOW_PROPERTY_MODAL
    }
}

export function hidePropertyModal() {
    return {
        type: HIDE_PROPERTY_MODAL
    }
}
