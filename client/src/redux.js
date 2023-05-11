import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
// import persistedReducer from './store/reducers/rootReducer'
import rootReducer from './store/reducers/rootReducer'

const reduxStrore = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export let persistor = persistStore(reduxStrore)

export default reduxStrore;