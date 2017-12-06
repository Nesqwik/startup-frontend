// @flow

import React, {Component} from "react";
import BackCover from "../components/BackCover/BackCover";

type Props = {
    params: Object
};

type State = {
}

class Classroom extends Component<Props, State> {
    render() {
        return (
            <div>
                <BackCover />
                Afficher les informations de la classe {this.props.params.id}
            </div>
        );
    }
}

export default Classroom;
