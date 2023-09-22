const initState = {
    data: ''
}

const MarkdownReducer = (state = initState, action) => {

    switch (action.type) {
        case 'MARKDOWN_DATA':
            return {
                ...state, data: action.payload
            };
        case 'CLEAR_MARKDOWN':
            return {
                ...state, data: ''
            };
        default:
            return state;
    }

}

export default MarkdownReducer;
