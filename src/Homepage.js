import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeImage from "./img/Home.jpg";
import "./Homepage.css";

function Homepage() {
  return (
    <>
      <div className="navbar" id="navbar">
        <div className="btn" onClick={() => window.scrollTo(0, 0)}>
          <p>Home</p>
        </div>
        <div
          className="btn"
          onClick={() =>
            window.scrollTo(
              0,
              document.getElementById("title").offsetHeight -
                document.getElementById("navbar").offsetHeight
            )
          }
        >
          <p>About</p>
        </div>
        <Link to="/Login" className="btn">
          <p>Sign In</p>
        </Link>
      </div>

      <div className="title" id="title">
        <div className="titlegrid">
          <div>
            <h1>Humble Charity Donations</h1>
            <p>A bridge between Donors and Donees.</p>
          </div>
        </div>
      </div>
      <div className="intro" id="aboutus">
        <img src={HomeImage} alt="" />
        <div>
          <h3>About Us</h3>
          <p>Small or Big..... </p>
          <p>
            {" "}
            We accept all kinds of danations including Apparels, Clothes, Food,
            Furnitures, Stationary and many more...
          </p>
        </div>
      </div>
      <div className="authentication">
        <div className="donate">
          DONATE
          <span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3349/3349234.png"
              alt="Red Heart"
            />
          </span>
        </div>
        <div className="register">
          <div className="donordiv">
            <h3>Register as Donor!</h3>
            <Link to="/DonorRegistraion">
              <button>Donor</button>
            </Link>
          </div>
          <div className="charitydiv">
            <h3>Register as Donee!</h3>
            <Link to="/CharityRegistration">
              <button>Donee</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
