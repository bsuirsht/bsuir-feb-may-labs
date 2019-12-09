import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

import App from "./components/App";

import "./static/scss/style.scss";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
