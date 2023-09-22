const initState = {
    Language: 'vi'
}

const languageReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return {
                ...state, Language: action.payload
            };

        default:
            return state;
    }

}

export default languageReducer;
