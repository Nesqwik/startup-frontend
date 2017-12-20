// @flow

import {connect} from 'react-redux'
import * as StudentSelector from "../../reducers/StudentReducer";
import * as QCMSelector from "../../reducers/QCMReducer";
import * as StudentActions from "../../actions/StudentActions";
import DisplayQCMAnswers from "../../components/DisplayQCMAnswers/DisplayQCMAnswers";
import type {QCM} from "../../types/QCM";
import * as QCMActions from "../../actions/QCMActions";

/**
 * Mapping entre le store (global) et les props requises pour les composants AddStudent et ClassroomDisplay
 * @param store
 * @returns {{postStatus, students, fetchStatusClass, fetchStatusStudent, classroom}}
 */
const mapStateToProps = (store: Object, props: Object) => {

    let qcmId = props.qcmId;
    let qcm: QCM = QCMSelector.getQCM(store, qcmId);

    return {
        qcmId: qcmId,
        students: (qcm ? StudentSelector.getStudentsForClass(store, qcm.classroom.id) : []),
        qcm: qcm,
        answerMap: (qcm ? QCMSelector.getQcmAnswers(store, qcm.id) : {})
    }
};

const mapDispatchToProps = {
    fetchStudents: StudentActions.getStudents,
    fetchQCMs: QCMActions.fetchQCMs,
    fetchAnswers: QCMActions.fetchAnswers
};

const ClassroomContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayQCMAnswers);

export default ClassroomContainer;
