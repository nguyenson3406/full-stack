import languageReducer from "./languageReducer";
import userReducer from "./userReducer";
import MarkdownReducer from "./MarkdownReducer";
import ProfileReducer from "./ProfileReducer";
import { combineReducers } from 'redux'


import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

// const rootPersistConfig = {
//     key: 'root',
//     storage: storage,
//     whitelist: ['home']
// }

export const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo', 'accessToken']
};

export const languagePersistConfig = {
    ...persistCommonConfig,
    key: 'language',
    whitelist: ['Language']
};

// const rootReducer = (state = {}, action) => ({
//     home: homeReducer(state.home, action),
//     user: userReducer(state.user, action),
// })

const rootReducer = combineReducers({
    language: persistReducer(languagePersistConfig, languageReducer),
    user: persistReducer(userPersistConfig, userReducer),
    markdown: MarkdownReducer,
    profile: ProfileReducer,
})
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export default rootReducer
