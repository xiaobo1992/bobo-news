import * as API from '../api/news';
import {DEFAULT_COUNTRY, API_KEY, PAGE_START, DEFAULT_LANGUAGE, 
    ACTION_REPLACE_NEWS_LIST, ACTION_APPEND_NEWS_LIST } from '../constant';

export function getHeadLine(page, searchString, optional) {
    return async (dispatch) => {
        let params = {
            page: page,
            q: searchString,
            country: DEFAULT_COUNTRY,
            apiKey: API_KEY
        };
        
        for (var key in optional) {
            if (key === 'category' && optional[key].name === 'all') {
                continue;
            }
            params[key] = optional[key].name;
        }

        const {status, totalResults, articles} = await API.getHeadLine(params);

        if (status === 'error') {
            return;
        }

        if (page === PAGE_START) {
            dispatch({type: ACTION_REPLACE_NEWS_LIST, payload: { news : articles, totalResults:  totalResults}})
        } else {
            dispatch({type: ACTION_APPEND_NEWS_LIST,  payload: { news : articles, totalResults:  totalResults }})
        }
    }
};

export function getEverything(page, searchString, optional) {
    return async (dispatch) => {
        console.log(optional)

        let params = {
            q: searchString,
            apiKey: API_KEY,
            page: page,
            language: DEFAULT_LANGUAGE
        };

        for (var key in optional) {
            params[key] = optional[key].name;
        }

        const {status, totalResults, articles} = await API.getEverything(params);

        if (status === 'error') {
            return;
        }

        if (page === PAGE_START) {
            dispatch({type: ACTION_REPLACE_NEWS_LIST, payload: { news : articles, totalResults:  totalResults }})
        } else {
            dispatch({type: ACTION_APPEND_NEWS_LIST, payload: { news : articles, totalResults:  totalResults }})
        }
    }
};