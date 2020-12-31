export function updateSettings(type, payload) {
    return async (dispatch) => {
        dispatch({type: type, payload: payload});
    };
};