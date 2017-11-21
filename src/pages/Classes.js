// @flow

import React, {Component} from "react";
import CreateClassContainer from "../containers/CreateClass/CreateClassContainer";
import ListClassContainer from "../containers/ListClass/ListClassContainer";

type Props = {
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
                <ListClassContainer />
                <CreateClassContainer />
            </div>
        );
    }
}

export default Classes;
