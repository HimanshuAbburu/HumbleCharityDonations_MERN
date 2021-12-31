import React from "react";
import { useState } from "react";
import "./DonorHomepage.css";
import userImage from "./img/user.png";
import clothes from "./img/Clothes.jpg";
import { data } from "./dataFordhTesting.js";

const DonorHomepage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

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

  const DonatedItems = () => {
    const EachItem = ({ title, img, location }) => {
      return (
        <>
          <div className="donateditems">
            <img src={img} alt="" style={{ height: "200px", width: "300px" }} />
            <h3>{title}</h3>
            <h4>{location}</h4>
          </div>
        </>
      );
    };

    return (
      <>
        <section className="donationsitemlist">
          {data.map((item, id) => {
            return (
              <>
                <EachItem key={item.id} {...item} />
              </>
            );
          })}
        </section>
      </>
    );
  };

  const DonateProduct = () => {
    return (
      <>
        <form className="dhpdonationbox" action="#">
          <div>
            <div>
              <label className="dhpdonationboxlabel" htmlFor="ProductName">
                Product Name
              </label>
              <input
                className="dhpdonationboxvalue"
                type="text"
                id="ProductName"
              />
            </div>
            <div>
              <label className="dhpdonationboxlabel" htmlFor="Address">
                Address
              </label>
              <input className="dhpdonationboxvalue" type="text" id="Address" />
            </div>
            <div>
              <label className="dhpdonationboxlabel" htmlFor="City">
                City
              </label>
              <input className="dhpdonationboxvalue" type="text" id="City" />
            </div>
            <div>
              <label className="dhpdonationboxlabel" htmlFor="Photos">
                Photos
              </label>
              <input
                type="file"
                name="Photos"
                accept="image/png, image/jpeg, image/jpg"
              />
              <div className="addbutton">+</div>
            </div>
            <div className="dhpbuttonsdiv">
              <button className="dhpbuttons">Add Item</button>
              <button className="dhpbuttons">Reset</button>
              <button className="dhpbuttons">Cancel</button>
            </div>
          </div>
        </form>
      </>
    );
  };

  /*
   * Below is the actual rendering section
   */

  return (
    <>
      <div className="titlebar">
        <div className="lefttitle">
          <h1>H D</h1>
        </div>
        <div className="righttitle">
          <button
            onClick={() => {
              setShowDonate(!showDonate);
            }}
          >
            Donate
          </button>
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
        <DoneeProfile />
      ) : (
        <div className="centerbody">
          <h1>Start Donating</h1>
        </div>
      )}
      {showDonate ? <DonateProduct /> : ""}
      <h1 className="donatedItemshead">Donated Items</h1>
      <DonatedItems />
    </>
  );
};

export default DonorHomepage;
