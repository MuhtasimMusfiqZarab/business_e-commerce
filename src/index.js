import React from "react";
import ReactDOM from "react-dom";
import "gestalt/dist/gestalt.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.querySelector("#root"));

serviceWorker.unregister();

// This restricts reload but changes the content
if (module.hot) {
  module.hot.accept();
}
