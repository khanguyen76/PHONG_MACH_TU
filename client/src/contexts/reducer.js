export const initialState = {
    auth: null
}
export const reducer = (state, action) => {
    switch (action.type) {
        case 'setAuth':{
            return {
                ...state,
                auth: action.payload
            };
        }
        default:
            return state;
    }
};
