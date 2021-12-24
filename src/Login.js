import React from "react";
import Image from "./img/Login-Greetings.jpeg";
import "./Login.css";

const Login = () => {
  return (
    <>
      <h1 id="head">Login</h1>
      <form action="#">
        <div className="Login">
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </p>
          <button className="signin">Submit</button>
        </div>
        <div></div>
      </form>
    </>
  );
};

export default Login;
