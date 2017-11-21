// @flow

import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from 'react-router-redux'
import classReducer from "./ClassReducer"

/**
 * Combinaison des reducers.
 * @type {Reducer<any>}
 */
const reducers = combineReducers({
    form: formReducer,
    routing: routerReducer,
    classState: classReducer
});

export default reducers;
