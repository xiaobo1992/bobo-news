import React, { useCallback } from 'react';
import {Row, Select} from 'antd';
import { useMappedState, useDispatch } from 'redux-react-hook';
import _ from 'lodash';
import { updateSettings } from '../actions/settings';
import {languageEnum, sortByEnum, categoryEnum, countryEnum, ACTION_UPDATE_SORT_BY, ACTION_UPDATE_LANGUAGE, ACTION_UPDATE_CATEGORY, ACTION_UPDATE_COUNTRY, HEAD_LINE_KEY, EVERYTHING_KEY} from '../constant';
import styles from './index.module.scss';

const Setting = (props) => {
    
    const {newsType} = props;
    const dispatch = useDispatch();

    const mapState = useCallback((state) => {
        return {
            sortBy: state.settingsReducer.sortBy,
            language: state.settingsReducer.language,
            category: state.settingsReducer.category,
            country: state.settingsReducer.country
        }
    }, []);
    
    const {sortBy, language, country, category} = useMappedState(mapState);

    const handleSelect = (value, action) => {
        let settingOptions = null;

        switch(action) {
            case ACTION_UPDATE_SORT_BY: 
                settingOptions = sortByEnum;
                break;
            case ACTION_UPDATE_LANGUAGE:
                settingOptions = languageEnum;
                break;
            case ACTION_UPDATE_CATEGORY:
                settingOptions = categoryEnum;
                break;
            case ACTION_UPDATE_COUNTRY:
                settingOptions = countryEnum;
                break;
            default:
                return;
        }

        let index = _.findIndex(settingOptions, (option) => {
            return option.name === value;
        });

        if (index > -1) {
            dispatch(updateSettings(action, {payload : settingOptions[index]}));
        }
    };

    return(
        <>
            {newsType === EVERYTHING_KEY && 
                <div className={styles.section}>
                    <Row>Language</Row> 
                    <Row>
                        <Select className={styles.fullWidth} defaultValue={language.label} onSelect={e=>handleSelect(e, ACTION_UPDATE_LANGUAGE)}>
                            {
                                languageEnum.map(language => <Select.Option key={language.name}>{language.label}</Select.Option>)
                            }
                        </Select>
                    </Row>
                </div>
            }

            {newsType === EVERYTHING_KEY && 
                <div className={styles.section}>
                    <Row>Sort By</Row> 
                    <Row>
                        <Select className={styles.fullWidth} defaultValue={sortBy.label} onSelect={e=>handleSelect(e, ACTION_UPDATE_SORT_BY)}>
                            {
                                sortByEnum.map(sortBy => <Select.Option key={sortBy.name}>{sortBy.label}</Select.Option>)
                            }
                        </Select>
                    </Row>
                </div>
            }
            
            {newsType === HEAD_LINE_KEY && 
                <div className={styles.section}>
                    <Row>Category</Row> 
                    <Row>
                        <Select className={styles.fullWidth} defaultValue={category.label} onSelect={e=>handleSelect(e, ACTION_UPDATE_CATEGORY)}>
                            {
                                categoryEnum.map(category => <Select.Option key={category.name}>{category.label}</Select.Option>)
                            }
                        </Select>
                    </Row>
                </div>
            }

            {newsType === HEAD_LINE_KEY &&
                <div className={styles.section}>
                    <Row>Country</Row> 
                    <Row>
                        <Select className={styles.fullWidth} defaultValue={country.label} onSelect={e=>handleSelect(e, ACTION_UPDATE_COUNTRY)}>
                            {
                                countryEnum.map(country => <Select.Option key={country.name}>{country.label}</Select.Option>)
                            }
                        </Select>
                    </Row>
                </div>
            }

        </>
    );
};

export default Setting;