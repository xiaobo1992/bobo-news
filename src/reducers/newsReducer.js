//import React from 'react';

import { ACTION_APPEND_NEWS_LIST, ACTION_REPLACE_NEWS_LIST } from "../constant";

const newsReducer = (state={newsList:[]}, action) => {
    const {news} = action.payload || [];
    const {totalResults} = action.payload || 0;

    switch (action.type) {
        case ACTION_APPEND_NEWS_LIST: 
            return {
                ...state,
                newsList: [...state.newsList].concat(news),
                totalResults: totalResults
            };
        case ACTION_REPLACE_NEWS_LIST:
            return {
                ...state,
                newsList: news,
                totalResults: totalResults
            }
        default:
            return state;
    }
};

export default newsReducer;