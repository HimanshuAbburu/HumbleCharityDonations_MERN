import React from "react";
import "./DonorRegistration.css";

const DonorRegistraion = () => {
  return (
    <>
      <div className="body">
        <div>
          <h1>Donor Registration</h1>
          <span>
            All fields marked with <ast>*</ast> are mandatory.
          </span>
        </div>
        <form action="#">
          <div className="SignUp">
            <p>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
            </p>
            <p>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" />
            </p>
            <p>
              <label htmlFor="phone">Phone</label>
              <input type="number" name="phone" min="10" max="11" />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
            </p>
            <p>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
            </p>
            <p>
              <label htmlFor="password">Re-enter Password</label>
              <input type="password" name="password" />
            </p>
            <button>SignUp</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DonorRegistraion;
