// @flow

import React, {Component} from "react";
import coverImage from "./cover.png";

class BackCover extends Component {

    render() {
        const style = {
            width: "100%",
            marginTop: "-29px"
        };

        return (
            <img src={coverImage} alt="Couverture par défault" style={style}/>
        );
    }
}

export default BackCover;
