import React from "react";
import { useState, useRef } from "react";
import "./DonorHomepage.css";
import userImage from "./img/user.png";
import { useLocation } from "react-router-dom";
import { data } from "./dataFordhTesting.js";

const uploadItems = async (files, data) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("productImages", files[i]);
  }
  formData.append("uid", data.uid);
  formData.append("productName", data.productName);
  formData.append("address", data.address);
  formData.append("city", data.city);
  formData.append("postcode", data.postcode);

  for (let i of formData.values()) {
    console.log(i);
  }

  try {
    const response = await fetch("http://localhost:5000/uploadImages", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getData = async (uid) => {
  try {
    // const url = `https://us-central1-humbledonations.cloudfunctions.net/app/donorGetRequest/${uid}`;
    const url = `http://localhost:5000/donorGetRequest/${uid}`;
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const DonorHomepage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [addNewItem, setAddNewItem] = useState({ booli: false, count: 0 });
  const location = useLocation();
  const userInfoData = location.state;

  const DoneeProfile = ({ data }) => {
    const [certificate, setCertificate] = useState({ status: false, urls: [] });

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
            <div className="profileGrid">
              <div className="dhplabel">
                <label>Name</label>
              </div>
              <div className="dhpvalue">
                <label>{data.name}</label>
              </div>
              <div className="dhplabel">
                <label>Address</label>
              </div>
              <div className="dhpvalue">
                <label>{data.address}</label>
              </div>
              <div className="dhplabel">
                <label>City</label>
              </div>
              <div className="dhpvalue">
                <label>{data.city}</label>
              </div>
              <div className="dhplabel">
                <label>Postcode</label>
              </div>
              <div className="dhpvalue">
                <label>{data.postcode}</label>
              </div>
              <div className="dhpvalue">
                <label className="dhplabel">Phone</label>
              </div>
              <div className="dhpvalue">
                <label>{data.phoneNo}</label>
              </div>
              <div className="dhplabel">
                <label>Email</label>
              </div>
              <div className="dhpvalue">
                <label>{data.email}</label>
              </div>
            </div>
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
            <img src={img} alt="" />
            <h3 className="donateditemsName">{title}</h3>
            <h4 className="donateditemsName">{location}</h4>
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

  const DonateProduct = ({ uid, setAddNewItem, count, userInfo }) => {
    const productName = useRef(null);
    const addressInput = useRef(null);
    const cityInput = useRef(null);
    const postcodeInput = useRef(null);
    const fileInput = useRef(null);
    const [status, setStatus] = useState({ booli: false, msg: "" });
    const [images, setImages] = useState({ status: false, files: [] });
    const [reload, setReload] = useState(false);

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
                ref={productName}
              />
            </div>
            <div>
              <label className="dhpdonationboxlabel" htmlFor="Address">
                Address
              </label>
              <input
                className="dhpdonationboxvalue"
                type="text"
                id="Address"
                ref={addressInput}
              />
            </div>
            <div>
              <label className="dhpdonationboxlabel" htmlFor="City">
                City
              </label>
              <input
                className="dhpdonationboxvalue"
                type="text"
                id="City"
                ref={cityInput}
              />
            </div>
            <div>
              <label className="dhpdonationboxlabel" htmlFor="postcode">
                Postcode
              </label>
              <input
                className="dhpdonationboxvalue"
                type="text"
                id="postcode"
                ref={postcodeInput}
              />
            </div>
            <div>
              <label className="dhpdonationboxlabel" htmlFor="Photos">
                Photos
              </label>
              <input
                type="file"
                hidden="hidden"
                name="photos"
                accept="image/png, image/jpeg, image/jpg"
                multiple
                ref={fileInput}
                onChange={(e) => {
                  try {
                    fileUrl(e.target.files, images.files).then((response) => {
                      setImages({ status: true, files: response });
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
              <div
                className="addbutton"
                onClick={() => fileInput.current.click()}
              >
                +
              </div>
              <div className="dhpnewitemstatus">
                <p>{status.msg}</p>
              </div>
              {images.status && <UploadedImages images={images.files} />}
            </div>
            <div className="dhpbuttonsdiv">
              <button
                className="dhpbuttons"
                type="button"
                onClick={() => {
                  if (
                    productName.current.value !== "" &&
                    cityInput.current.value !== "" &&
                    addressInput.current.value !== "" &&
                    postcodeInput.current.value !== "" &&
                    fileInput.length !== 0
                  ) {
                    const data = {
                      uid,
                      productName: productName.current.value,
                      address: addressInput.current.value,
                      city: cityInput.current.value,
                      postcode: postcodeInput.current.value,
                    };
                    console.log(data);
                    uploadItems(fileInput.current.files, data).then(
                      (response) => {
                        if (response.status) {
                          setAddNewItem({ booli: false, count: count + 1 });
                        } else {
                          setStatus({ booli: true, msg: response.msg });
                        }
                      },
                    );
                  } else {
                    setStatus({
                      booli: true,
                      msg: "Please populate all fields",
                    });
                  }
                }}
              >
                Add Item
              </button>
              <button
                className="dhpbuttons"
                onClick={(e) => {
                  e.preventDefault();
                  productName.current.value = "";
                  addressInput.current.value = "";
                  cityInput.current.value = "";
                  postcodeInput.current.value = "";
                  fileInput.current.value = "";
                  setImages({ status: false, files: [] });
                  setStatus({ booli: false, msg: "" });
                }}
              >
                Reset
              </button>
              <button
                className="dhpbuttons"
                onClick={() => {
                  setShowDonate(false);
                }}
              >
                Cancel
              </button>
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
          <div>
            <h1>HD</h1>
          </div>
        </div>
        <div className="righttitle">
          <button
            onClick={() => {
              setAddNewItem({ booli: true, count: addNewItem.count });
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
        <DoneeProfile data={userInfoData} />
      ) : (
        <div className="centerbody">
          <h1>Start Donating</h1>
        </div>
      )}
      {addNewItem.booli && (
        <DonateProduct
          uid={userInfoData.uid}
          setAddNewItem={setAddNewItem}
          count={addNewItem.count}
          userInfo={userInfoData}
        />
      )}
      <h1 className="donatedItemshead">Donated Items</h1>
      <DonatedItems />
    </>
  );
};

const UploadedImages = ({ images }) => {
  return (
    <div className="dhpimages">
      <div className="dhpimagecontainer">
        {images.map((item, index) => {
          return (
            <img
              src={item}
              alt="UploadedImages"
              key={index}
              className="dhpuploadedimage"
            />
          );
        })}
      </div>
    </div>
  );
};

const fileUrl = async (currentImages, previousImages) => {
  let url = [];
  for (let i = 0; i < currentImages.length; i++) {
    const singleUrl = await getUrl(currentImages[i]);
    url.push(singleUrl);
  }
  url.push(...previousImages);
  return url;
};

const getUrl = (prop) => {
  const readFile = new FileReader();
  return new Promise((resolve, reject) => {
    readFile.readAsDataURL(prop);
    readFile.onload = (e) => {
      resolve(e.target.result);
    };
  });
};

export default DonorHomepage;
