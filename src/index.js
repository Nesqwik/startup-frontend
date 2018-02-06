// @flow

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import "./index.css";
import "./api/listeners/WsHelper";

import store from "./configs/Store";
import theme from "./configs/theme";

import Routes from "./pages/Routes";

const history = syncHistoryWithStore(hashHistory, store);


let state = localStorage.getItem("state");

store.dispatch({
    type: "RESTORE",
    state: JSON.parse(state)
});

store.subscribe(() => {
    let state = store.getState();
    localStorage.setItem("state", JSON.stringify(state));
});

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
