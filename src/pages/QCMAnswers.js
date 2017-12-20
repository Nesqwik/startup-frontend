// @flow

import React, {Component} from "react";
import QCMAnswersContainer from "../containers/QCMAnswersContainer/QCMAnswersContainer";

type Props = {
    params: Object
};

type State = {
}

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
