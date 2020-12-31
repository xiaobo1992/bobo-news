import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
    newsReducer,
    settingsReducer
});

export default rootReducer;