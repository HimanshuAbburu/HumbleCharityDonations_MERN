import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";

const Pages = () => {
  return <Login />;
};

ReactDOM.render(
  <React.StrictMode>
    <Pages />
  </React.StrictMode>,
  document.getElementById("root")
);
