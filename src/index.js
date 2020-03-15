import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Sentry.init({
	dsn: "https://63802cc0d9e54b368387a4a190d0e6f5@sentry.io/4801632"
});

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
