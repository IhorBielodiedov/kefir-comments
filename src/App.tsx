import {Provider} from "react-redux";
import store from "./store";
import {ListWrapper} from "./components/list-wrapper/ListWrapper";
import "./App.css";

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
