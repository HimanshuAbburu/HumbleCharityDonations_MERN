import React from "react";
import { useState } from "react";
import "./DonorHomepage.css";
import userImage from "./img/user.png";

const DonorHomepage = () => {
  const DoneeProfile = () => {
    return (
      <>
        <div className="dhpprofile">
          <span
            className="close"
            onClick={() => {
              setShowProfile(!showProfile);
            }}
          >
            &times;
          </span>
          <div>
            <h3>Your Profile</h3>
          </div>
          <div>
            <table>
              <tbody>
                <tr className="trwidth">
                  <td className="dhplabel">Name</td>
                  <td className="dhpvalue">Himanshu Abburu</td>
                </tr>
                <tr className="trwidth">
                  <td className="dhplabel">Address</td>
                  <td className="dhpvalue">
                    Flat A9 Code Block A 42a Western Road Leicester - Ky6 2 HZ
                  </td>
                </tr>
                <tr className="trwidth">
                  <td className="dhplabel">Phone</td>
                  <td className="dhpvalue">07983876715</td>
                </tr>
                <tr className="trwidth">
                  <td className="dhplabel">Email</td>
                  <td className="dhpvalue">himanshuabburu$1234_@gmial.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div className="titlebar">
        <div className="lefttitle">
          <h1>H D</h1>
        </div>
        <div className="righttitle">
          <button>Donate</button>
          <img
            src={userImage}
            alt="user"
            onClick={() => {
              setShowProfile(!showProfile);
            }}
          />
        </div>
      </div>
      {showProfile ? (
        <div className="centerbody">
          <h1>Start Donating</h1>
        </div>
      ) : (
        <DoneeProfile />
      )}
    </>
  );
};

export default DonorHomepage;
