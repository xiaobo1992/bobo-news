import React, {useState, useEffect, useCallback} from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import {Input, Spin, Drawer} from 'antd';
import {UpCircleOutlined, SettingOutlined} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import NewsCard from '../component/newsCard/index.js';
import Setting from "../setting/index.js";
import {getHeadLine, getEverything} from '../actions/news';
import {HEAD_LINE_KEY, EVERYTHING_KEY, PAGE_START, MAX_RESULT} from '../constant';
import styles from './index.module.scss';

const Home = () => {

    const dispatch = useDispatch();
    const [page, setPage] = useState(PAGE_START);
    const [searchString, setSearchString] = useState("");
    const [newsType, setNewsType] = useState(HEAD_LINE_KEY);
    const [settingVisible, setSettingVisible] = useState(false);
    //const [currentLanguage] = useState();

    const mapState = useCallback((state) => {
        return {
            newsList: state.newsReducer.newsList,
            totalResults: state.newsReducer.totalResults,
            sortBy: state.settingsReducer.sortBy,
            language: state.settingsReducer.language,
            category: state.settingsReducer.category,
            country: state.settingsReducer.country
        };
    }, []);

    const {newsList, totalResults, sortBy, language, category, country} = useMappedState(mapState);
    
    useEffect(()=> {
        dispatch(getHeadLine(page, searchString, {category: category, country: country}));
    }, [dispatch]);

    // update according headline setting update
    useEffect(() => {
        setPage(PAGE_START);
        dispatch(getHeadLine(PAGE_START, searchString, {category: category, country: country}));
    }, [category, country]);

    // update everything headline setting update
    useEffect(() => {
        setPage(PAGE_START);
        dispatch(getEverything(PAGE_START, searchString, {sortBy: sortBy, language: language}));
    }, [sortBy, language]);

    const handleInputChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleSubmit = (e) => {
        setPage(PAGE_START);
        if (searchString.length === 0) {
            dispatch(getHeadLine(PAGE_START, searchString, {category: category, country: country}));
            setNewsType(HEAD_LINE_KEY);
        } else {
            dispatch(getEverything(PAGE_START, searchString, {sortBy: sortBy, language: language}));
            setNewsType(EVERYTHING_KEY);
        }
        window.scrollTo(0, 0);
    };

    const loadMoreNews = () => {   
        if (newsType === HEAD_LINE_KEY) {
            dispatch(getHeadLine(page + 1, searchString, {category: category, country: country}));
            setPage(page + 1);
        } else if (newsType === EVERYTHING_KEY) {
            dispatch(getEverything(page + 1, searchString, {sortBy: sortBy, language: language}));
            setPage(page + 1);
        }
    };

    const handleClickUpward = (e) => {
        window.scroll(0, 0);
    };

    const handleClickSetting = (e) => {
        setSettingVisible(true);
    }

    const closeSetting = ()=> {
        setSettingVisible(false);
    }

    return (
        <>
            <Input onChange={e => handleInputChange(e)} onPressEnter={e=> handleSubmit(e)} className={styles.fixedInput} bordered="false"></Input>
            <InfiniteScroll
                pageStart={0}
                hasMore={newsList.length < totalResults && newsList.length < MAX_RESULT}
                loadMore={loadMoreNews}
                initialLoad={false}
                threshold={10}
                loader={<Spin size={'large'} className={styles.spin}></Spin>}
                className={styles.listContainer}
            >
            {
                newsList && newsList.map((element, index) =>    
                    <NewsCard news={element} key={index}></NewsCard>
                )
            }
            </InfiniteScroll>
            <div className={styles.iconList}>
                <SettingOutlined onClick={e => handleClickSetting(e)}/>
                <UpCircleOutlined onClick={e => handleClickUpward(e)}/>
            </div>
            <Drawer
                visible={settingVisible}
                placement={'right'}
                onClose={closeSetting}
                closable={false}>
                    <Setting className={styles.settingContainer} newsType={newsType}></Setting>
            </Drawer>
        </>
    );
};

export default Home;