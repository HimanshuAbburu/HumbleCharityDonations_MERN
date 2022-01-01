import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharityHomePage from "./CharityHomePage";
import CharityRegistration from "./CharityRegistration";
import DonorHomepage from "./DonorHomepage";
import DonorRegistraion from "./DonorRegistraion";
import Homepage from "./Homepage";
import Login from "./Login";

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route
          exact
          path="/charityregistration"
          element={<CharityRegistration />}
        />

        <Route exact path="/DonorRegistraion" element={<DonorRegistraion />} />

        <Route exact path="/Login" element={<Login />} />

        <Route exact path="/CharityHomePage" element={<CharityHomePage />} />

        <Route exact path="/DonorHomepage" element={<DonorHomepage />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Pages />
  </React.StrictMode>,
  document.getElementById("root")
);
