// @flow
import React, {Component} from 'react'
import Menu from "./Menu";
import {IndexRoute, Route, Router} from 'react-router'
import Classes from "./Classes";
import Classroom from "./Classroom";
import QCMAnswers from "./QCMAnswers";
import Login from "./Login";
import EmptyContainer from "./EmptyContainer";

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
                <Route path="/" component={EmptyContainer}>
                    <IndexRoute component={Login}/>
                </Route>
                <Route path="/app" component={Menu}>
                    <IndexRoute component={Classes}/>
                    <Route path="classes" component={Classes}/>
                    <Route path="classes/:id" component={Classroom}/>
                    <Route path="qcm/:id" component={QCMAnswers}/>
                </Route>
            </Router>
        );
    }
}

export default Routes;
