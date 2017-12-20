// @flow

import {connect} from 'react-redux'
import ClassroomDisplay from '../../components/Classroom/ClassroomDisplay'
import type {Classroom} from "../../types/Classroom";
import * as StudentSelector from "../../reducers/StudentReducer";
import * as ClassSelector from "../../reducers/ClassReducer";
import * as ClassActions from "../../actions/ClassActions";
import * as StudentActions from "../../actions/StudentActions";

/**
 * Mapping entre le store (global) et les props requises pour les composants AddStudent et ClassroomDisplay
 * @param store
 * @returns {{postStatus, students, fetchStatusClass, fetchStatusStudent, classroom}}
 */
const mapStateToProps = (store: Object, props:Object) => {

    let classroom: ?Classroom = ClassSelector.getClass(store, props.id);

    return{
        postStatus: StudentSelector.getPostStatus(store),
        students: (classroom && classroom.id ? StudentSelector.getStudentsForClass(store, classroom.id) : []),
        fetchStatusClass: ClassSelector.getFetchStatus(store),
        fetchStatusStudent: StudentSelector.getFetchStatus(store),
        classroom : classroom,

    }
};

/**
 * Mapping entre les actions et les props requises pour les composants AddStudent et ClassroomDisplay
 * @type {{onAddStudent: addStudent, fetchClasses: fetchClasses, fetchStudents: getStudents, onAddBonus: addBonus, onAddMalus: addMalus}}
 */
const mapDispatchToProps = {
    onAddStudent: StudentActions.addStudent,
    fetchClasses: ClassActions.fetchClasses,
    fetchStudents: StudentActions.getStudents,
    onAddBonus: StudentActions.addBonus,
    onAddMalus: StudentActions.addMalus


};

const ClassroomContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassroomDisplay);

export default ClassroomContainer;
