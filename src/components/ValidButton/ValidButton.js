// @flow
import React from 'react'
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'material-ui/svg-icons/action/done';
import BlockIcon from 'material-ui/svg-icons/content/block';

type Props = {
    isValid: boolean,
    isLoading: boolean,
    label: string
}

type State = {}

class ValidButton extends React.Component<Props, State> {

    state = {};

    getIcon() {
        if (this.props.isLoading) {
            return <CircularProgress size={25}/>;
        }

        if (!this.props.isValid) {
            return <BlockIcon/>;
        }

        return <DoneIcon/>;
    }

    render() {
        let {isValid, isLoading, label} = this.props;

        return (
            <RaisedButton
                type="submit"
                label={label}
                secondary={true}
                disabled={!isValid || isLoading}
                className="submit-button"
                labelPosition="before"
                icon={this.getIcon()}
            />
        );
    }
}

export default ValidButton;
