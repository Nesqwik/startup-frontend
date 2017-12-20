// @flow

import React, {Component} from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


type Props = {};

type State = {}

/**
 * Permet de créer un "add button" qui s'affiche en haut à droite au dessus du menu.
 */
class AddButton extends Component<Props, State> {

    render() {
        const style = {
            position: "absolute",
            right: "30px",
            marginTop: "-32px",
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
