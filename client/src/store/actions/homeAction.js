export const addUser = () => {
    let id = Math.floor(Math.random() * 10000)
    let user = { id: id, name: `random - ${id}` }
    return {
        type: 'CREATE_USER',
        payload: user
    }
}