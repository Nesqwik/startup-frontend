// @flow
import React from 'react'
import type {QCM} from "../../types/QCM";
import {Link} from 'react-router'
import {TableRowColumn} from "material-ui";

type Props = {
    qcm: QCM
}

class QCMItem extends React.Component<Props, State> {
    render() {
        return (
            <TableRowColumn key={3}>
                <Link activeStyle={{color: "black"}} to={`/qcm/${this.props.qcm.id}/`}>
                    {this.props.qcm.title}
                </Link>
            </TableRowColumn>
        );
    }
}

export default QCMItem;
