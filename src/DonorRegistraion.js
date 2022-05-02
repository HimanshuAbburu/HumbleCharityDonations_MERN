import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./DonorRegistration.css";
import { auth, DonorRegister, writeUserData, isGoodPassword, emailVerification } from "./Authentication";

const DonorRegistration = () => {
  const DONOR = "donor";

  const name = useRef(null);
  const address = useRef(null);
  const city = useRef(null);
  const postcode = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const reEnterPassword = useRef(null);

  async function Register(
    name,
    address,
    city,
    postcode,
    phone,
    email,
    password,
    reEnterPassword,
  ) {
    if (
      name !== "" &&
      address !== "" &&
      city !== "" &&
      postcode !== "" &&
      email !== "" &&
      password !== "" &&
      reEnterPassword !== "" &&
      phone !== ""
    ) {
      if (password === reEnterPassword) {
        try {
          const userId = await DonorRegister({ auth, email, password });
          await writeUserData(
            userId,
            name,
            address,
            city,
            postcode,
            email,
            phone,
            DONOR,
          );
          await emailVerification();
          // console.log(verificationResponse);
          alert("Registration Success...!");
          console.log("Success");
        } catch (error) {
          // console.log(error);
        }
      } else {
        return {
          status: 0,
          msg: "Please make sure re-entered password is same as password.",
        };
      }
    } else {
      return { status: 0, msg: "Please fill all details." };
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Register(
      name.current.value,
      address.current.value,
      city.current.value,
      postcode.current.value,
      phone.current.value,
      email.current.value,
      password.current.value,
      reEnterPassword.current.value,
    );
  };

  return (
    <>
      <div className="nav" id="nav">
        <div className="navleft">
          <p>H D</p>
        </div>
        <div className="navright">
          <Link to="/" className="button">
            <p>Home</p>
          </Link>

          <Link to="/Login" className="button">
            <p>Sign In</p>
          </Link>
        </div>
      </div>
      <div className="body">
        <div className="heading">
          <h1>Donor Registration</h1>
          <span>
            <span className="asterisk">*</span> Mandatory fields.
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="SignUp">
            <p>
              <label htmlFor="name">
                Name <span className="asterisk">*</span>
              </label>
              <input type="text" name="name" ref={name} />
            </p>
            <p>
              <label htmlFor="address">
                Address<span className="asterisk">*</span>
              </label>
              <input type="text" name="address" ref={address} />
            </p>
            <p>
              <label htmlFor="city">
                City<span className="asterisk">*</span>
              </label>
              <input type="text" name="city" ref={city} />
            </p>
            <p>
              <label htmlFor="postcode">
                Postcode<span className="asterisk">*</span>
              </label>
              <input type="text" name="postcode" ref={postcode} />
            </p>
            <p>
              <label htmlFor="phone">
                Phone<span className="asterisk">*</span>
              </label>
              <input type="number" name="phone" ref={phone} />
            </p>
            <p>
              <label htmlFor="email">
                Email<span className="asterisk">*</span>
              </label>
              <input type="email" name="email" ref={email} />
            </p>
            <p>
              <label htmlFor="password">
                Password<span className="asterisk">*</span>
              </label>
              <input type="password" name="password" ref={password} />
            </p>
            <p>
              <label htmlFor="reEnterPassword">
                Re-enter Password<span className="asterisk">*</span>
              </label>
              <input
                type="password"
                name="reEnterPassword"
                ref={reEnterPassword}
                onClick={() => {
                  const rule = isGoodPassword(password.current.value);
                  if (rule.length !== 0) {
                    alert(`Your password does not contain\n ${rule}`);
                  }
                }}
              />
            </p>
            <button type="submit" onClick={Register}>
              SignUp
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DonorRegistration;
