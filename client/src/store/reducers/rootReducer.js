import homeReducer from "./homeReducer";
import userReducer from "./userReducer";
import MarkdownReducer from "./MarkdownReducer";
import CatalogReducer from "./CatalogReducer";
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

// const rootReducer = (state = {}, action) => ({
//     home: homeReducer(state.home, action),
//     user: userReducer(state.user, action),
// })

const rootReducer = combineReducers({
    home: homeReducer,
    user: persistReducer(userPersistConfig, userReducer),
    markdown: MarkdownReducer,
    catalog: CatalogReducer,
    profile: ProfileReducer,
})
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export default rootReducer
