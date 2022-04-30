import "./CharityProfile.css";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getCertificates, logout } from "./Authentication.js";

const CharityProfile = () => {
  const location = useLocation();
  const [certificate, setCertificate] = useState({ status: false, urls: [] });
  const [clipboard, setclipboard] = useState({
    phoneNo: { border: "2px solid rgb(22, 29, 111)" },
    email: { border: "2px solid rgb(22, 29, 111)" },
  });
  const [redirect, setRedirect] = useState({ status: false, warning: false });
  const { name, address, city, postcode, phoneNo, email } = location.state;
  console.log(location.state);
  const [edit, setEdit] = useState(false);
  const addressref = useRef(null);
  // const cityref = useRef(null);
  // const postcoderef = useRef(null);
  const phoneNoref = useRef(null);
  // const nameref = useRef(null);
  // const emailref = useRef(null);

  useEffect(() => {
    getCertificates(email)
      .then((data) => {
        setCertificate(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [email]);

  return (
    <>
      {redirect.status ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="cpgreeting">
            <p>Profile</p>
            {!edit && (
              <button
                className="edit"
                onClick={() => {
                  console.log("Edit...");
                  setEdit(true);
                }}
              >
                Edit
              </button>
            )}
          </div>
          <div className="cpmaindiv">
            <div className="cpprofile">
              <div className="cpdetails">
                <label className="dhplabel">Name:</label>
                <div className="cpvalue">{name}</div>
              </div>
              <div className="cpdetails">
                <label className="dhplabel">Street</label>
                {edit ? (
                  <input ref={addressref} defaultValue={address} />
                ) : (
                  <div className="cpvalue">{address}</div>
                )}
              </div>
              <div className="cpdetails">
                <label>City</label>
                <div className="cpvalue">{city}</div>
              </div>
              <div className="cpdetails">
                <label>Postcode</label>
                <div className="cpvalue">{postcode}</div>
              </div>
              <div className="cpdetails">
                <label>Phone No:</label>
                <div className="cpemailorphone">
                  {edit ? (
                    <input ref={phoneNoref} defaultValue={phoneNo} />
                  ) : (
                    <>
                      <div style={clipboard.phoneNo}>{phoneNo}</div>
                      <img
                        src="https://img.icons8.com/fluent-systems-regular/96/000000/copy.png"
                        alt="copy"
                        className="copyPNG"
                        onClick={() => {
                          navigator.clipboard.writeText(phoneNo);
                          setclipboard({
                            phoneNo: { border: "2px solid #c7ffd8" },
                            email: { border: "2px solid rgb(22, 29, 111)" },
                          });
                          setTimeout(() => {
                            setclipboard({
                              phoneNo: { border: "2px solid rgb(22, 29, 111)" },
                              email: { border: "2px solid rgb(22, 29, 111)" },
                            });
                          }, 2000);
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="cpdetails">
                <label>Email:</label>
                <div className="cpemailorphone">
                  <div style={clipboard.email}>{email}</div>
                  <img
                    src="https://img.icons8.com/fluent-systems-regular/96/000000/copy.png"
                    alt="copy"
                    className="copyPNG"
                    onClick={() => {
                      navigator.clipboard.writeText(email);
                      setclipboard({
                        phone: { border: "2px solid rgb(22, 29, 111)" },
                        email: { border: "2px solid #c7ffd8" },
                      });
                      setTimeout(() => {
                        setclipboard({
                          phone: { border: "2px solid rgb(22, 29, 111)" },
                          email: { border: "2px solid rgb(22, 29, 111)" },
                        });
                      }, 2000);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="cpviewphotos">
              {certificate.status ? (
                certificate.urls.map((url, index) => {
                  return (
                    <img
                      src={url}
                      alt="certificate"
                      className="cpcertificate"
                      key={index}
                    />
                  );
                })
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
          {edit ? (
            <div className="cpsaveinfodiv">
              <button
                className="cpsavebtn"
                onClick={() => {
                  setEdit(false);
                  // console.log(nameref.current.value);
                  location.state = {
                    name: name,
                    address: addressref.current.value,
                    city: city,
                    postcode: postcode,
                    phoneNo: phoneNo,
                    email: email,
                  };
                }}
              >
                Save
              </button>
              <button
                className="cpsavebtn"
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="cplogout">
              {redirect.warning && <p>Error!! Try again</p>}
              <button
                onClick={() => {
                  logout().then((response) => {
                    if (response.status === 1) {
                      setRedirect({ status: true, warning: false });
                    } else {
                      setRedirect({ status: false, warning: true });
                      setTimeout(() => {
                        setRedirect({ status: false, warning: false });
                      }, 2000);
                    }
                  });
                }}
              >
                Logout
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default CharityProfile;
