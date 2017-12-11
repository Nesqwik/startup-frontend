// @flow

import React, {Component} from "react";
import {CardMedia, CardTitle} from "material-ui";


class BackCover extends Component {



    render() {
        return (
            <CardMedia overlay={<CardTitle title={this.props.title}/>}>
                <img src={this.props.image} alt="" />
            </CardMedia>
        );
    }
}

export default BackCover;
