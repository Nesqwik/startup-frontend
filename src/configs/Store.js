import {compose, createStore} from "redux";
import reducer from "../reducers/index";
import {middleware} from "../configs/middleware";

const store = createStore(
    reducer,
    compose(middleware)
);

export default store;
