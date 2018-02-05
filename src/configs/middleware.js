/**
 * Created by louis on 01/11/17.
 */

import {applyMiddleware, compose} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import {routerMiddleware} from 'react-router-redux';

import {hashHistory} from 'react-router';


/**
 * Ajoute le plugin redux_devtools si présent dans le navigateur.
 *
 */
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            actionCreators: {}
        }) : compose;



export const middleware = composeEnhancers(
    applyMiddleware(promiseMiddleware(), routerMiddleware(hashHistory)),
);