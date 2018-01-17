// @flow

import {connect} from 'react-redux'
import * as TeacherActions from "../../actions/TeacherActions";
import TeacherConnection from "../../components/TeacherConnection/TeacherConnection";
import * as TeacherSelector from "../../reducers/TeacherReducer"
import {push} from "react-router-redux";


/**
 * Mapping entre le store (global) et les props requises pour le composant Teacher Connection
 * @param store
 * @returns {{postStatusSubscription, postStatusConnection}}
 */
const mapStateToProps = (store: Object) => {
    return{
        postStatusSubscription: TeacherSelector.getPostStatusSubscription(store),
        postStatusConnection: TeacherSelector.getPostStatusConnection(store)
    }
};

/**
 * Mapping entre les actions et les props requises pour le composant TeacherConnection
 * @type {{onTeacherSubscribe: subscribeTeacher, onTeacherConnect: connectTeacher}}
 */
const mapDispatchToProps = {
    onTeacherSubscribe: TeacherActions.subscribeTeacher,
    onTeacherConnect: TeacherActions.connectTeacher,
    redirectToApp: () => push(`/app`)
};

const TeacherConnectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeacherConnection);

export default TeacherConnectionContainer;
