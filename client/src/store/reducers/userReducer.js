const initState = {
    isLoggedIn: false,
    userInfo: null,
    accessToken: null
}

const userReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload.user,
                accessToken: action.payload.accessToken
            };

        case 'PROCESS_LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                accessToken: null
            }

        default:
            return state
    }

}
export default userReducer