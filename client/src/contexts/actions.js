import { logMissingFieldErrors } from "@apollo/client/core/ObservableQuery";

export const saveProfile = async ({ account, dispatch }) => {
    dispatch({
        type: "setAuth",
        payload: {
            ...account,
            isLogin: true
        }
    })
    localStorage.setItem('access_token',account.accessToken);
}
export const updateProfile = async ({ data, state, dispatch }) => {
    const { auth } = state;
    dispatch({
        type: "setAuth",
        payload: {
            ...auth,
            ...data,
        }
    })
}
export const removeProfile = async ({ state, dispatch }) => {
    dispatch({
        type: "setAuth",
        payload: {
            isLogin: false,
        }
    })
    localStorage.removeItem('access_token');
}
