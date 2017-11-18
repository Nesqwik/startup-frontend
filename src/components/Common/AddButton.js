// @flow

import React, {Component} from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


type Props = {};

type State = {}

class AddButton extends Component<Props, State> {

    render() {
        const style = {
            position: "absolute",
            right: "50px",
            top: "36px",
            zIndex: "1200"
        };

        return (
            <FloatingActionButton style={style} {...this.props} secondary={true}>
                <ContentAdd/>
            </FloatingActionButton>
        );
    }
}

export default AddButton;
