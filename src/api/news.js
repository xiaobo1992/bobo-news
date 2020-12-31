import axios from 'axios';
import * as interceptors from '../util/interceptors.js';

const getAxiosInstance = () => {
    const instance = axios.create();
    return instance;
}

export function getHeadLine(payload) {
    const instance = getAxiosInstance();
    interceptors.doInstall(instance);
    return instance.get('/proxy/v2/top-headlines', {params: payload}).then(function(res) {
        return res;
    }, function(err) {
        return err;
    });
};

export function getEverything(payload) {
    const instance = getAxiosInstance();
    interceptors.doInstall(instance);
    return instance.get('/proxy/v2/everything', {params: payload}).then(function(res) {
        return res;
    }, function(err) {
        return err;
    });
};
