// @flow

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import "./index.css";
import "./api/index";

import store from "./configs/Store";
import theme from "./configs/theme";

import Routes from "./pages/Routes";

const history = syncHistoryWithStore(browserHistory, store);

/**
 * Point d'entrée de react sur la page index.html.
 */
ReactDOM.render(
    <MuiThemeProvider muiTheme={theme}>
        <Provider store={store}>
            <Routes history={history}/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
