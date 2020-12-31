import React, { lazy, Suspense } from 'react';
import {Route, Switch} from 'react-router-dom';
import {Spin} from 'antd';
import styles from './index.module.scss';

const Home = lazy(() => import('../home'));

const MyRouter= ()=> {
    return (
        <Suspense fallback={
            <Spin className={styles.spin} size={'large'}></Spin>
        }>
            <Switch>
                <Route exact path="/home" component={Home}></Route>
            </Switch>
        </Suspense>
    );
};

export default MyRouter;