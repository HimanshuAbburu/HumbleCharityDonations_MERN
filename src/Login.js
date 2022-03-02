import React from "react";
import Image from "./img/Login-Greetings.jpeg";
import "./Login.css";

const Login = () => {
  return (
    <>
      <h1 id="head">Login</h1>
      <div className="main">
        <div className="left">
          <form className="login">
            <div>
              <label htmlFor="email" className="loginlabel">
                Email
              </label>
              <input type="email" name="email" className="logininput" />
            </div>
            <div>
              <label htmlFor="password" className="loginlabel">
                Password
              </label>
              <input type="password" name="password" className="logininput" />
            </div>
            <button className="loginsignin">Submit</button>
          </form>
        </div>
        <div className="right">
          <img src={Image} alt="" className="img" />
        </div>
      </div>
    </>
  );
};

export default Login;
