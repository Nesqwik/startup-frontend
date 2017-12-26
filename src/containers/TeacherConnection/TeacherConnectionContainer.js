// @flow

import {connect} from 'react-redux'
import * as TeacherActions from "../../actions/TeacherActions";
import TeacherConnection from "../../components/TeacherConnection/TeacherConnection";
import * as TeacherSelector from "../../reducers/TeacherReducer"

/**
 * Mapping entre le store (global) et les props requises pour le composant Teacher Connection
 * @param store
 * @returns {{postStatus}}
 */
const mapStateToProps = (store: Object, props:Object) => {


    return{
        postStatusSubscription: TeacherSelector.getPostStatusSubscription(store),
    }
};

/**
 * Mapping entre les actions et les props requises pour les composants AddStudent et ClassroomDisplay
 * @type {{onAddStudent: addStudent, fetchClasses: fetchClasses, fetchStudents: getStudents, onAddBonus: addBonus, onAddMalus: addMalus}}
 */
const mapDispatchToProps = {
    onTeacherSubscribe: TeacherActions.subscribeTeacher,

};

const TeacherConnectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeacherConnection);

export default TeacherConnectionContainer;
