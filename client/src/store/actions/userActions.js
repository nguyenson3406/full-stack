export const Login = (user, accessToken) => {
    // if (user.image) {
    //     user.image = new Buffer.from(user.image, 'base64').toString('binary')
    // }
    let newState = {
        userInfo: user,
        accessToken: accessToken
    }
    return {
        type: 'LOGIN_SUCCESS',
        payload: newState
    }
}

export const Logout = () => {
    return {
        type: 'PROCESS_LOGOUT',
    }
}