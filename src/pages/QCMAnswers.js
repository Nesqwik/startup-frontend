// @flow

import React, {Component} from "react";
import QCMAnswersContainer from "../containers/QCMAnswersContainer/QCMAnswersContainer";

type Props = {
    params: Object
};

type State = {
}

/**
 * Page d'affichage des résultats à un QCM d'une classe
 * Accessible via /qcm/idqcm

 */
class QCMAnswers extends Component<Props, State> {
    render() {

        return (
            <div>
                <QCMAnswersContainer qcmId={+this.props.params.id}/>
            </div>
        );
    }
}

export default QCMAnswers;
