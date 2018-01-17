// @flow
import React, {Component} from 'react'

type Props = {
    children: Array<any>
};

type State = {
};


class EmptyContainer extends Component<Props, State> {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default EmptyContainer;
