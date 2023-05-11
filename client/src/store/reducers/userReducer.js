const initState = {
    isLoggedIn: false,
    userInfo: null
}

const userReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload
            };

        case 'PROCESS_LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }

        default:
            return state
    }

}
export default userReducer