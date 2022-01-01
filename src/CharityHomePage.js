import React from "react";
import { useState } from "react";
import "./CharityHomePage.css";
import userImage from "./img/user.png";

const CharityHomePage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [navstyle, setnavstyle] = useState({
    items: {
      backgroundColor: "#33b1af",
      color: "aliceblue",
      boxShawdow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    },
    booli: true,
    requests: {
      backgroundColor: "white",
      color: "#33b1af",
    },
  });

  const CharityProfile = () => {
    return (
      <>
        <div className="charityProfileHead">
          <h1>Profile</h1>
        </div>
        <form action="#">
          <div className="charityViewPhotos">
            <div className="repeatimages">
              <img
                src="https://www.jcct.org.je/wp-content/uploads/2020/10/Certificate.jpg"
                alt=""
              />
              <img
                src="https://www.jcct.org.je/wp-content/uploads/2020/10/Certificate.jpg"
                alt=""
              />
              <img
                src="https://www.jcct.org.je/wp-content/uploads/2020/10/Certificate.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="charityprofile">
            <div>
              <label htmlFor="CharityName">CharityName</label>
              <input
                type="text"
                name="CharityName"
                id="CharityName"
                value="Humble Donations"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="charityAddress">Address</label>
              <input
                type="text"
                name="charityAddress"
                id="charityAddress"
                value="132 Keith Dr Glenrothes - KY6 2HZ"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="charityPhone">Phone</label>
              <input
                type="text"
                name="charityPhone"
                id="charityPhone"
                value="9448699870"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="charityEmail">Email</label>
              <input
                type="text"
                name="charityEmail"
                id="charityEmail"
                value="humbleDonation_1234@gmail.com"
                readOnly
              />
            </div>

            <div>
              <button>Logout</button>
            </div>
          </div>
        </form>
      </>
    );
  };

  /*
   * This is the main return
   */
  return (
    <>
      <div className="chpmaindiv">
        <div className="chptitle">
          <div className="chptitleleft">
            <p>H D</p>
          </div>
          <div className="chpnavbar">
            <button
              style={navstyle.items}
              onClick={() =>
                setnavstyle({
                  booli: true,
                  items: {
                    backgroundColor: "#33b1af",
                    color: "aliceblue",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                  },
                  requests: {
                    backgroundColor: "white",
                    color: "#33b1af",
                  },
                })
              }
            >
              Items
            </button>
            <button
              style={navstyle.requests}
              onClick={() => {
                setnavstyle({
                  booli: false,
                  items: {
                    backgroundColor: "white",
                    color: "#33b1af",
                  },
                  requests: {
                    backgroundColor: "#33b1af",
                    color: "aliceblue",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                  },
                });
              }}
            >
              My Requests
            </button>
          </div>
          <div className="chptitleright">
            <div>
              <img
                src={userImage}
                alt="user"
                className="userPNG"
                onClick={() => {
                  setShowProfile(!showProfile);
                }}
              />
            </div>
          </div>
        </div>
        {showProfile ? <CharityProfile /> : <div>Hello</div>}
      </div>
    </>
  );
};

export default CharityHomePage;
