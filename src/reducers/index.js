// @flow

import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from 'react-router-redux';
import classReducer from "./ClassReducer";
import QCMReducer from "./QCMReducer";
import studentReducer from "./StudentReducer";
import teacherReducer from "./TeacherReducer";

/**
 * Combinaison des reducers.
 * @type {Reducer<any>}
 */
const reducers = combineReducers({
    form: formReducer,
    classState: classReducer,
    studentState: studentReducer,
    teacherState: teacherReducer,
    routing: routerReducer,
    QCMState: QCMReducer
});

export default reducers;
