import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./store/reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider {...{ store }}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
