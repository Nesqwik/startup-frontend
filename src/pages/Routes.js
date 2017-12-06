// @flow
import React, {Component} from 'react'
import Menu from "./Menu";
import {IndexRoute, Route, Router} from 'react-router'
import Classes from "./Classes";
import Classroom from "./Classroom";

type Props = {
    history: Object
};

type State = {};

/**
 * Définition des routes et des composant utilisant ces routes.
 */
class Routes extends Component<Props, State> {

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={Menu}>
                    <IndexRoute component={Classes} />
                    <Route path="classes" component={Classes} />
                    <Route path="classes/:id" component={Classroom} />
                </Route>
            </Router>
        );
    }
}

export default Routes;
