const initState = {
    users: [
        { id: 1, name: 'Eric' },
        { id: 2, name: 'Hoi Dan IT' },
        { id: 3, name: 'Hoi Dan IT voi ERIC' }
    ],
    posts: []
}

const homeReducer = (state = initState, action) => {

    switch (action.type) {
        case 'DELETE_USER':
            let users = state.users;
            users = users.filter(item => item.id !== action.payload.id)
            return {
                ...state, users
            };

        case 'CREATE_USER':
            return {
                ...state, users: [...state.users, action.payload]
            }

        default:
            return state;
    }

}

export default homeReducer;
