// @flow
import axios from "axios";
import Configs from "../configs/Configs";
import store from "../configs/Store";
import * as TeacherSelectors from "../reducers/TeacherReducer";
import type {Credentials} from "../types/Credentials";

/**
 * Crée une instance axios préconfiguré (header, baseURL...).
 * Gère la propagation d'erreur selon l'erreur retournée par le back.
 * @returns {AxiosInstance}
 */
const getApiInstance = () => {
    let axiosInstance = axios.create({
        baseURL: Configs.ENDPOINT,
        timeout: 10000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    axiosInstance.interceptors.response.use(function (response) {
        return response.data; // unwrap data response
    }, function (error) {
        console.log(error);
        // If there is error data, return the error array.
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }

        // Else return default error message
        return Promise.reject(["Erreur inconnue, veuillez contacter le support."]);
    });

    axiosInstance.interceptors.request.use(function (config) {

        let state = store.getState();

        console.log(TeacherSelectors.isConnected(state));
        if (TeacherSelectors.isConnected(state)) {
            let credentials: Credentials = TeacherSelectors.getCredentials(state);
            config.auth = {
                username: credentials.email,
                password: credentials.password
            };
            console.log(config.auth);
        }

        return config;
    }, function (error) {

        return Promise.reject(error);
    });

    return axiosInstance;
};

export default getApiInstance();