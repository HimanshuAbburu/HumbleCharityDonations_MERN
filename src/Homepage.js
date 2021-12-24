import React, { useState, useRef, useEffect } from "react";
import HomeImage from "./img/Home.jpg";
import "./Homepage.css";

function App() {
  return (
    <>
      <div className="navbar">
        <button className="btn" onClick={() => window.scrollTo(0, 0)}>
          Home
        </button>
        <button className="btn" onClick={() => window.scrollTo(0, 640)}>
          About
        </button>
        <button className="btn">Sign In</button>
      </div>

      <div className="intro">
        <div>
          <h1>Charity Donations Portal</h1>
          <h3>Connecting Charities and Donors!</h3>
        </div>
      </div>
      <div className="grid">
        <img src={HomeImage} alt="" />
        <div className="about">
          <h1>About Us</h1>
          <p>Small or Big. We accept all kinds of danations.</p>
        </div>
      </div>

      <div className="register">
        <div className="registration">
          <h2>Register as Donor</h2>
          <button>Donor</button>
        </div>
        <h1>Register</h1>
        <div className="registration">
          <h2>Register as Charity</h2>
          <button>Charity</button>
        </div>
      </div>
    </>
  );
}

export default App;
