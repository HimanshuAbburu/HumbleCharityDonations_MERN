import React from "react";
import { useState, useRef, useEffect } from "react";
import "./DonorHomepage.css";
import userImage from "./img/user.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getSingleDonee,
  getDoneeData,
  getCertificates,
  logout,
} from "./Authentication";

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

  try {
    // // const urlDomain = "http://localhost:5000";

    const response = await fetch(
      "https://us-central1-humbledonations.cloudfunctions.net/app/uploadImages",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getData = async (uid) => {
  try {
    // const urlDomain = "http://localhost:5000";

    // const urlDomain =
    //   "https://us-central1-humbledonations.cloudfunctions.net/app";

    // const url = ;

    const response = await fetch(
      `https://us-central1-humbledonations.cloudfunctions.net/app/donorGetRequest/${uid}`,
    );
    const data = response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPhotos = async (id) => {
  try {
    // const urlDomain = "http://localhost:5000";

    // const urlDomain =
    //   "https://us-central1-humbledonations.cloudfunctions.net/app";

    // const url =;

    const response = await fetch(
      `https://us-central1-humbledonations.cloudfunctions.net/app/getPhoto/${id}`,
    );
    const data = response.json();
    // console.log(response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const acceptRequest = async (donoruid, doneeuid, productId, city) => {
  // const urlDomain = "http://localhost:5000";

  // const urlDomain =
  //   "https://us-central1-humbledonations.cloudfunctions.net/app";

  // const url = ;

  const response = await fetch(
    `https://us-central1-humbledonations.cloudfunctions.net/app/acceptRequest`,
    {
      method: "POST",
      body: JSON.stringify({ donoruid, doneeuid, productId, city }),
      headers: { "Content-type": "application/json" },
    },
  );

  const data = await response.json();

  return data;
};

const deleteItem = async (details) => {
  // const urlDomain = "http://localhost:5000";

  // const urlDomain =
  //   "https://us-central1-humbledonations.cloudfunctions.net/app";

  // const url = ;

  const { productId, city, uid, photos } = details;

  const response = await fetch(
    `https://us-central1-humbledonations.cloudfunctions.net/app/deleteItem`,
    {
      method: "DELETE",
      body: JSON.stringify({ productId, city, uid, photos }),
      headers: { "Content-type": "application/json" },
    },
  );

  const data = await response.json();
  // console.log(data);
  return data;
};

const DonorHomepage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [addNewItem, setAddNewItem] = useState({ booli: false, count: 0 });

  const location = useLocation();
  const userInfoData = location.state;

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
              // console.log(showDonate);
              setShowDonate(!showDonate);
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
        <DonorProfile data={userInfoData} setViewProfile={setShowProfile} />
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
      <DonatedItems uid={userInfoData.uid} count={addNewItem.count} />
    </>
  );
};

const DoneeProfile = ({ data, setViewProfile }) => {
  // console.log(data);
  const { Email, Address, City, Phone, Name, Postcode } = data.donee;
  const [certificate, setCertificate] = useState({ status: false, urls: [] });

  useEffect(() => {
    getCertificates(Email)
      .then((response) => {
        setCertificate(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [Email]);

  // console.log(data);

  return (
    <div className="modal">
      <div className="modalContent">
        <span
          className="close"
          onClick={() => {
            setViewProfile(false);
          }}
        >
          &times;
        </span>
        <div className="displayProfile">
          <div className="charityProfileHead">
            <h1>Profile</h1>
          </div>
          <div className="chpdetails">
            <div className="details">
              <div className="field">
                <label>Name</label>
                <input type="text" value={Name} readOnly />
              </div>
              <div className="field">
                <label>Address</label>
                <input type="text" value={Address} readOnly />
              </div>
              <div className="field">
                <label>City</label>
                <input type="text" value={City} readOnly />
              </div>
              <div className="field">
                <label>Postcode</label>
                <input type="text" value={Postcode} readOnly />
              </div>
              <div className="field">
                <label>Phone</label>
                <input type="text" value={Phone} readOnly />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="text" value={Email} readOnly />
              </div>
            </div>
            <div className="chpcertificates">
              <div className="charitycertificates">
                <div className="repeatimages">
                  {certificate.urls.map((item, index) => {
                    return <img src={item} alt="" key={index} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonorProfile = ({ data, setViewProfile }) => {
  // const [certificate, setCertificate] = useState({ status: false, urls: [] });

  const history = useNavigate();

  return (
    <>
      <div className="modal">
        <div className="modalContent">
          <span
            className="close"
            onClick={() => {
              setViewProfile(false);
            }}
          >
            &times;
          </span>
          <div className="dhpprofile">
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
                <button
                  className="logout"
                  onClick={() => {
                    logout().then((resp) => {
                      if (resp.status === 1) {
                        history("/login");
                      }
                    });
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DonatedItems = ({ uid, count }) => {
  const [items, setItems] = useState({
    status: 0,
    loading: true,
    products: [],
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getData(uid).then((response) => {
      setItems(response);
    });
  }, [count, reload, uid]);

  return (
    <>
      {items.loading ? (
        <div>
          <div className="loader"></div>
          Loading...
        </div>
      ) : (
        <>
          {items.status && items.products.length ? (
            <>
              <div>
                <div className="donatedItems">
                  <Items
                    uid={uid}
                    items={items.products}
                    reload={reload}
                    setReload={setReload}
                  />
                </div>
              </div>
            </>
          ) : (
            <div>Start Donating</div>
          )}
        </>
      )}
    </>
  );
};

const Items = ({ uid, items, reload, setReload }) => {
  const [viewProduct, setViewProduct] = useState({ booli: false, data: {} });
  // console.log(viewProduct);
  return (
    <>
      {viewProduct.booli ? (
        <div>
          <SingleProduct
            data={viewProduct.data}
            uid={uid}
            setViewProduct={setViewProduct}
            reload={reload}
            setReload={setReload}
          />
        </div>
      ) : (
        <div className="donateditemscontainer">
          {items.map((item, index) => {
            // console.log(item);
            return (
              <div
                className="dhpitem"
                key={index}
                onClick={() => {
                  setViewProduct({ booli: true, data: item });
                }}
              >
                <div className="productimagesdiv">
                  <Images photos={item.photos} />
                </div>
                <div className="dhpitemfooter">
                  <div className="dhpitemdetails">
                    <p className="dhpitemname">{item.productName}</p>
                    <p className="dhpitemaddress">{item.city}</p>
                  </div>
                  <div className="dhpitemrequests">
                    {item.requests.length} req(s)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const SingleProduct = ({ data, uid, setViewProduct, reload, setReload }) => {
  const { productName, photos, address, city, postcode } = data;
  const [loading, setLoading] = useState(false);
  // console.log(data);
  return (
    <div className="singleitem">
      <div className="singleitemheader">
        <div className="singleitemname">
          <p>{productName}</p>
        </div>
        <div
          className="singleclose"
          onClick={() => {
            setViewProduct({ booli: false, data: {} });
          }}
        >
          <p>
            {" "}
            <span className="asterisk">{"<"}</span> Back
          </p>
        </div>
      </div>
      <div className="singleitembody">
        <div className="singleproductimagediv">
          <div className="singleproductimagecontainer">
            <Images photos={photos} />
          </div>
        </div>
        <div className="singleitemright">
          <div className="singleitemdetails">
            <div className="dhplabel">
              <label>Address:</label>
            </div>
            <div className="dhpvalue">
              <label>{address}</label>
            </div>
            <div className="dhplabel">
              <label>City:</label>
            </div>
            <div className="dhpvalue">
              <label>{city}</label>
            </div>
            <div className="dhplabel">
              <label>Postcode:</label>
            </div>
            <div className="dhpvalue">
              <label>{postcode}</label>
            </div>
          </div>
          <DonatedORNot
            singledata={data}
            uid={uid}
            reload={reload}
            setReload={setReload}
            setViewProduct={setViewProduct}
          />
        </div>
      </div>
      {loading ? (
        <div>
          <div className="loader"></div>
          Loading...
        </div>
      ) : (
        <div className="deleteitem">
          <button
            onClick={() => {
              setLoading(true);
              // console.log("deleting...");
              deleteItem({
                productId: data.productId,
                city: data.city,
                uid,
                photos: data.photos,
              }).then((response) => {
                if (response.count > 0) {
                  setReload(!reload);
                  setViewProduct({ booli: false, data: {} });
                } else {
                  setLoading(false);
                }
              });
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const DonatedORNot = ({
  singledata,
  uid,
  reload,
  setReload,
  setViewProduct,
}) => {
  // console.log(singledata);

  return (
    <>
      {singledata.donated.status ? (
        <SingleDonee uid={singledata.donated.uid} />
      ) : (
        <div className="singleproductsrequest">
          <div className="dhplabel">Requests</div>
          {/* {console.log(singledata)} */}
          {singledata.requests.length ? (
            <Requests
              requests={singledata.requests}
              productId={singledata.productId}
              donoruid={uid}
              city={singledata.city}
              reload={reload}
              setReload={setReload}
              setViewProduct={setViewProduct}
            />
          ) : (
            <div>No Requests</div>
          )}
        </div>
      )}
    </>
  );
};

const SingleDonee = ({ uid }) => {
  const [doneeData, setDoneeData] = useState({ loading: true });
  const [viewProfile, setViewProfile] = useState({ status: false, data: {} });

  useEffect(() => {
    getSingleDonee(uid).then((response) => {
      // console.log(response);
      setDoneeData(response);
    });
  }, [uid]);
  console.log(doneeData);
  // console.log(viewProfile);
  return (
    <>
      {viewProfile.status && (
        <DoneeProfile data={viewProfile.data} setViewProfile={setViewProfile} />
      )}
      {doneeData.loading ? (
        <div>
          <div className="loader"></div>
          Loading...
        </div>
      ) : (
        <>
          {doneeData.status ? (
            <div className="accdonee">
              <div className="dhplabel">You have accepted the request of:</div>
              <div className="accdoneedetails">
                <div className="accdoneedetailsheader">
                  <div className="dhpvalue">{doneeData.donee.Name}</div>
                  <div>
                    <button
                      className="doneeviewprofile"
                      onClick={() => {
                        // console.log("clicked");
                        setViewProfile({
                          status: true,
                          data: { donee: doneeData.donee, uid },
                        });
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                <div className="accdoneeemailphone">
                  <div className="accdoneephone">
                    <div className="dhplabel">Phone:</div>
                    <div className="dhpvalue">{doneeData.donee.Phone}</div>
                    <div className="dhplabel">Email:</div>
                    <div className="dhpvalue">{doneeData.donee.Email}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Error...!</div>
          )}
        </>
      )}
    </>
  );
};

const Requests = ({
  requests,
  productId,
  donoruid,
  city,
  reload,
  setReload,
  setViewProduct,
}) => {
  const [reqDonees, setReqDonees] = useState({ loading: true });
  const [viewProfile, setViewProfile] = useState({ status: false, data: {} });

  // console.log(productId);

  useEffect(() => {
    getDoneeData(requests).then((resp) => {
      // console.log(resp);
      setReqDonees(resp);
    });
  }, [requests]);

  return (
    <>
      {/* {console.log(viewProfile)} */}
      {viewProfile.status && (
        <DoneeProfile data={viewProfile.data} setViewProfile={setViewProfile} />
      )}
      <div>
        {reqDonees.loading ? (
          <div>
            <div className="loader"></div>
            Loading...
          </div>
        ) : (
          <div className="requestdiv">
            {reqDonees.donees.map((donee, index) => {
              return (
                <div className="singlerequest" key={index}>
                  <div className="dhpvalue">
                    <p>{donee.Name}</p>
                  </div>
                  <div className="singledoneeoptions">
                    <button
                      className="doneeviewprofile"
                      onClick={() => {
                        // console.log("Clicked");
                        setViewProfile({
                          status: true,
                          data: { donee, uid: requests[index].doneeuid },
                        });
                      }}
                    >
                      View Profile
                    </button>
                    <button
                      className="doneeaccept"
                      onClick={() => {
                        console.log("Accpeted...");
                        console.log(productId);
                        acceptRequest(
                          donoruid,
                          requests[index].doneeuid,
                          productId,
                          city,
                        ).then((rep) => {
                          setViewProduct({ booli: false, data: {} });
                          setReload(!reload);
                        });
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

const Images = ({ photos }) => {
  const [allImages, setAllImages] = useState({ status: 0, noimg: 0 });
  // console.log(photos);
  useEffect(
    () => {
      if (photos.length) {
        // console.log(photos);
        convertbuff(photos).then((resp) => {
          // console.log(resp);
          setAllImages({ status: 1, resp });
        });
      } else {
        setAllImages({ status: 1, noimg: 1 });
      }
    },
    [photos],
    [],
  );

  return (
    <>
      {/* {console.log(allImages)} */}
      {allImages.status ? (
        <div>
          {allImages.resp.map((item, index) => {
            // console.log(item);
            return (
              <img
                src={`data:image/png;base64,${item}`}
                alt="ItemImage"
                key={index}
              />
            );
          })}
        </div>
      ) : (
        <>
          {allImages.noimg ? (
            <img src="" alt="noImg" />
          ) : (
            <div>
              <div className="loader"></div>
              Loading...
            </div>
          )}
        </>
      )}
    </>
  );
};

const convertbuff = async (photos) => {
  let photoArray = [];
  for (let i = 0; i < photos.length; i++) {
    // console.log(photos[i]);
    const response = await getPhotos(photos[i]);
    // console.log(response);
    if (response.status === 1) {
      const buf = response.photoBuffer.map((buff) => {
        return Buffer.from(buff.data);
      });
      const base64image = Buffer.concat(buf);
      photoArray.push(base64image.toString("base64"));
    }
  }

  return photoArray;
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
          {reload ? (
            <div>
              <div className="loader"></div>
              Loading...
            </div>
          ) : (
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
                    setReload(true);
                    const data = {
                      uid,
                      productName: productName.current.value,
                      address: addressInput.current.value,
                      city: cityInput.current.value,
                      postcode: postcodeInput.current.value,
                    };
                    // console.log(data);
                    uploadItems(fileInput.current.files, data).then(
                      (response) => {
                        // console.log(response);
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
                  setAddNewItem({ booli: false, count: count });
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
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
