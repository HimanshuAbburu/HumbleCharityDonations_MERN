import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./CharityRegistration.css";
import { app, CharityRegister, writeUserData } from "./Authentication";
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const CHARITY = "charity";

const readFilesPromise = (prop) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(prop);
  });
};

const FileURL = async (prop) => {
  console.log(prop);
  const url = [];
  for (let i = 0; i < prop.length; i++) {
    const response = await readFilesPromise(prop[i]);
    url.push(response);
  }
  console.log(url);
  return url;
};

const uploadToDatabase = async (file, photos, email) => {
  const storage = getStorage(app);

  const certificatesRef = ref(storage, `certificates/${email}`);
  await uploadBytes(certificatesRef, file[0]);
  const photosRef = ref(storage, `photos/${email}`);
  for (let i = 0; i < photos.length; i++) {
    const fileRef = ref(photosRef, `${i}`);
    await uploadBytes(fileRef, photos[i]);
  }
};

const CharityRegistration = () => {
  const [certificate, setCertificate] = useState({
    status: false,
    url: [],
    file: false,
  });

  const [photos, setPhotos] = useState({ status: false, url: [], file: false });

  const name = useRef(null);
  const address = useRef(null);
  const city = useRef(null);
  const postcode = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const reEnterPassword = useRef(null);
  const inputFile = useRef(null);
  const otherFile = useRef(null);

  async function RegisterAsCharity(
    name,
    address,
    city,
    postcode,
    phone,
    email,
    password,
    reEnterPassword,
    file,
    photos,
  ) {
    if (
      name !== "" &&
      address !== "" &&
      city !== "" &&
      postcode !== "" &&
      email !== "" &&
      password !== "" &&
      reEnterPassword !== "" &&
      phone !== "" &&
      file &&
      photos
    ) {
      if (password === reEnterPassword) {
        try {
          const userId = await CharityRegister({
            email,
            password,
            file,
            photos,
          });

          await writeUserData(
            userId,
            name,
            address,
            city,
            postcode,
            phone,
            email,
            CHARITY,
          );

          await uploadToDatabase(file, photos, email);
        } catch (error) {
          console.log(error);
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
    // console.log(name.current.value);
    RegisterAsCharity(
      name.current.value,
      address.current.value,
      city.current.value,
      postcode.current.value,
      phone.current.value,
      email.current.value,
      password.current.value,
      reEnterPassword.current.value,
      certificate.file,
      photos.file,
    );
  };

  return (
    <>
      <div className="charitybody">
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
        <div className="charityheading">
          <h1>Charity Registration</h1>
          <h3>
            All fields marked with <span className="asterisk">*</span> are
            mandatory.
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="charitysignup">
            <div className="fields">
              <div>
                <label htmlFor="name">
                  Charity Name <span className="asterisk">*</span>
                </label>
                <input type="text" name="name" ref={name} />
              </div>
              <div>
                <label htmlFor="address">
                  Address<span className="asterisk">*</span>
                </label>
                <input type="text" name="address" ref={address} />
              </div>
              <div>
                <label htmlFor="city">
                  City<span className="asterisk">*</span>
                </label>
                <input type="text" name="city" ref={city} />
              </div>
              <div>
                <label htmlFor="postcode">
                  Postcode<span className="asterisk">*</span>
                </label>
                <input type="text" name="postcode" ref={postcode} />
              </div>
              <div>
                <label htmlFor="phone">
                  Phone<span className="asterisk">*</span>
                </label>
                <input type="number" name="phone" ref={phone} />
              </div>
              <div>
                <label htmlFor="email">
                  Email<span className="asterisk">*</span>
                </label>
                <input type="email" name="email" ref={email} />
              </div>
              <div>
                <label htmlFor="password">
                  Password<span className="asterisk">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={password}
                />
              </div>
              <div>
                <label htmlFor="reEnterPassword">
                  Re-enter Password<span className="asterisk">*</span>
                </label>
                <input
                  type="password"
                  name="reEnterPassword"
                  id="reEnterPassword"
                  ref={reEnterPassword}
                />
              </div>
            </div>
            <div className="upload">
              {certificate.status ? (
                <div className="crcertificate">
                  <img
                    src={certificate.url[0]}
                    alt="Certificate"
                    className="certificate"
                  />
                  <div
                    className="removecertificate"
                    onClick={() =>
                      setCertificate({ status: false, url: [], file: false })
                    }
                  >
                    <img
                      src="https://img.icons8.com/windows/96/000000/delete-forever.png"
                      alt="delete"
                    />
                  </div>
                </div>
              ) : (
                <div className="uploadimages">
                  <label htmlFor="certificate">
                    Upload Charity Certificate{" "}
                    <span className="asterisk">*</span>
                  </label>
                  <input
                    type="file"
                    hidden="hidden"
                    name="certificate"
                    accept="image/*"
                    ref={inputFile}
                    onChange={() => {
                      console.log(inputFile.current.files);
                      FileURL(inputFile.current.files).then((response) => {
                        setCertificate({
                          status: true,
                          url: response,
                          file: inputFile.current.files,
                        });
                      });
                    }}
                  />
                  <div
                    className="addbutton"
                    onClick={() => inputFile.current.click()}
                  >
                    +
                  </div>
                </div>
              )}

              {photos.status ? (
                <div className="charityphotos">
                  {photos.url.map((photo) => {
                    return <img src={photo} alt="1" className="photo" />;
                  })}
                </div>
              ) : (
                <div className="uploadimages">
                  <label htmlFor="photos">Upload Charity Pictures</label>
                  <input
                    type="file"
                    hidden="hidden"
                    name="photos"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    ref={otherFile}
                    onChange={(e) => {
                      FileURL(otherFile.current.files).then((result) =>
                        setPhotos({
                          status: true,
                          url: result,
                          file: otherFile.current.files,
                        }),
                      );
                    }}
                  />
                  <div
                    className="addbutton"
                    onClick={() => otherFile.current.click()}
                  >
                    +
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="signupbutton"
            onClick={RegisterAsCharity}
          >
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default CharityRegistration;
