// @flow

import React, {Component} from "react";
import TeacherConnectionContainer from "../containers/TeacherConnection/TeacherConnectionContainer";

type Props = {
    params: Object
};

type State = {
}

/**
 * Page de gestion des Classes.
 * Accessible via /classes
 */
class Classes extends Component<Props, State> {

    render() {
        return (
            <div>
                <TeacherConnectionContainer/>
            </div>
        );
    }
}

export default Classes;
