// @flow
import axios from "axios";
import Configs from "../configs/Configs";

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
        // If there is error data, return the error array.
        if(error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }

        // Else return default error message
        return Promise.reject(["Erreur inconnue, veuillez contacter le support."]);
    });
    return axiosInstance;
};

export default getApiInstance();