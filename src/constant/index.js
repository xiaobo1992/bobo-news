export * from './config';
export * from './settingEnum';
export * from './actions';

export const HOST = 'https://newsapi.org/v2';
export const DEFAULT_LANGUAGE = 'zh';
export const DEFAULT_COUNTRY = 'cn';
export const DEFAULT_SORT_BY =  {
    label: 'Time',
    name: 'publishedAt',
};
export const DEFAULT_LANGUAGE_I = {
    label: "Chinese",
    name: 'zh'
};
export const DEFAULT_COUNTRY_I = {
    label: 'China',
    name: 'cn'
};
export const DEFAULT_CATEGORY =     {
    label: 'All',
    name: 'all'
};
export const HEAD_LINE_KEY = 'headline';
export const EVERYTHING_KEY = "everything";
export const PAGE_START = 1;
export const MAX_RESULT = 100;  //only for developer account
