import React, {useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import CommentsList from "./components/comments-list/CommentsList";
import {subtractHours} from "./lib/date";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {AppDispatch, RootState} from "./store";
import {ListWrapper} from "./components/list-wrapper/ListWrapper";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <ListWrapper />
            </div>
        </Provider>
    );
}

export default App;
