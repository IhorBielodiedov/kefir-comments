import {Provider} from "react-redux";
import store from "./store";
import "./App.css";
import {ListWrapper} from "./components/list-wrapper";

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
