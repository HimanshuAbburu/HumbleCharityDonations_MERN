import React from "react";
import "./CharityRegistration.css";

const CharityRegistration = () => {
  return (
    <>
      <div className="charitybody">
        <div>
          <h1>Charity Registration</h1>
          <h3>
            All fields marked with <ast>*</ast> are mandatory.
          </h3>
        </div>
        <form action="#">
          <div className="charitysignup">
            <div>
              <label htmlFor="name">Charity Name</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="number" name="phone" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <div>
              <label htmlFor="password">Re-enter Password</label>
              <input type="password" name="password" id="password" />
            </div>

            <div className="upload">
              <div>
                <label htmlFor="certificate">Upload Charity Certificate</label>
                <input type="file" name="certificate" accept="image/*" />
              </div>
              <div className="addbutton">+</div>
            </div>

            <div className="upload">
              <div>
                <label htmlFor="doneepics">Upload Charity Pictures</label>
                <input type="file" name="doneepics" accept="image/*" />
              </div>
              <div className="addbutton">+</div>
            </div>
          </div>
          {/* </div> */}
          <button className="signupbutton">SignUp</button>
        </form>
      </div>
    </>
  );
};

export default CharityRegistration;
