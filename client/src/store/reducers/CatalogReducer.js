const initState = {
    data: ''
}

const CatalogReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CATALOG_DATA':
            return {
                ...state, data: action.payload
            };
        case 'CLEAR_CATALOG':
            return {
                ...state, data: ''
            };
        default:
            return state;
    }

}

export default CatalogReducer;
