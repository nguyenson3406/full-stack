export const ProfileData = (data) => {
    return {
        type: 'PROFILE_DATA',
        payload: data
    }
}

export const ClearProfile = () => {
    return {
        type: 'CLEAR_PROFILE',
    }
}