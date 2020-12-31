import { DEFAULT_SORT_BY, ACTION_UPDATE_SORT_BY, DEFAULT_LANGUAGE_I, ACTION_UPDATE_LANGUAGE, DEFAULT_COUNTRY_I, DEFAULT_CATEGORY, ACTION_UPDATE_COUNTRY, ACTION_UPDATE_CATEGORY } from '../constant';

const settingsReducer = (state={language: DEFAULT_LANGUAGE_I, sortBy: DEFAULT_SORT_BY, 
    country: DEFAULT_COUNTRY_I, category: DEFAULT_CATEGORY}, action) => {
    
    const {payload} = action.payload || [];

    switch (action.type) {
        case ACTION_UPDATE_LANGUAGE: 
            return {
                ...state,
                language: payload
            };
        case ACTION_UPDATE_SORT_BY:
            return {
                ...state,
                sortBy: payload
            }
        case ACTION_UPDATE_COUNTRY: 
            return {
                ...state,
                country: payload
            }
        case ACTION_UPDATE_CATEGORY: 
            return {
                ...state,
                category: payload
            }
        default:
            return state;
    }
};

export default settingsReducer;