// @flow
import React from 'react'
import type {Classroom} from "../../types/Classroom";
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router'

type Props = {
    classroom: Classroom
}

type State = {
    open: boolean
}

class ClassItem extends React.Component<Props, State> {
    render() {
        return (
            <Link to={`/app/classes/${this.props.classroom.id}`}>
                <Divider />
                <ListItem
                    key={3}
                    primaryText={this.props.classroom.className}
                />
            </Link>
        );
    }
}

export default ClassItem;
