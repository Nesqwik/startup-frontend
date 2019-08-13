// @flow

import React, {Component} from "react";
import ListQCMContainer from "../containers/ListQCM/ListQCMContainer";

type Props = {
    params: Object
};

type State = {
}

/*
    Page d'affichage de la liste des QCMs
 */
class QCMList extends Component<Props, State> {

    render() {

        return (
            <div>
                <ListQCMContainer idClass={+this.props.params.id}/>
            </div>
        );
    }
}

export default QCMList;
