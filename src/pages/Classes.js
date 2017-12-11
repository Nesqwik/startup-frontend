// @flow

import React, {Component} from "react";
import CreateClassContainer from "../containers/CreateClass/CreateClassContainer";
import ListClassContainer from "../containers/ListClass/ListClassContainer";
import BackCover from "../components/BackCover/BackCover";
import coverImage from "./cover.png";

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
                <BackCover title="Liste des Classes" image={coverImage} />
                <CreateClassContainer />
                <ListClassContainer />
            </div>
        );
    }
}

export default Classes;
