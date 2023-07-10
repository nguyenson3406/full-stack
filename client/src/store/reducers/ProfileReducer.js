const initState = {
    data: ''
}

const ProfileReducer = (state = initState, action) => {

    switch (action.type) {
        case 'PROFILE_DATA':
            return {
                ...state, data: action.payload
            };
        case 'CLEAR_PROFILE':
            return {
                ...state, data: ''
            };
        default:
            return state;
    }

}

export default ProfileReducer;
