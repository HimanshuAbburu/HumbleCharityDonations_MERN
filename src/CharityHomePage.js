import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./CharityHomePage.css";
import userImage from "./img/user.png";
import { getCertificates, logout, getDonorsData } from "./Authentication";

const getItems = async (city) => {
  try {
    // const urlDomain = "http://localhost:5000";

    // const urlDomain =
    //   "https://us-central1-humbledonations.cloudfunctions.net/app";

    const response = await fetch(
      `https://us-central1-humbledonations.cloudfunctions.net/app/getCharityRequest/${city}`,
    );
    const data = response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCitiesList = async () => {
  // const urlDomain = "http://localhost:5000";

  // const urlDomain =
  //   "https://us-central1-humbledonations.cloudfunctions.net/app";

  const response = await fetch(
    `https://us-central1-humbledonations.cloudfunctions.net/app/getCitiesList`,
  );
  const data = await response.json();
  // console.log(data.sort())
  return data;
};

const sendRequestToDonor = async (city, donoruid, doneeuid, productId) => {
  // const urlDomain = "http://localhost:5000";

  // const urlDomain =
  //   "https://us-central1-humbledonations.cloudfunctions.net/app";

  const response = await fetch(
    `https://us-central1-humbledonations.cloudfunctions.net/app/sendRequest`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, donoruid, doneeuid, productId }),
    },
  );
  const data = response.json();
  console.log(data);
};

const deletRequest = async (productinfo) => {
  // const urlDomain = "http://localhost:5000";

  // const urlDomain =
  //   "https://us-central1-humbledonations.cloudfunctions.net/app";

  const response = await fetch(
    `https://us-central1-humbledonations.cloudfunctions.net/app/deleteRequest`,
    {
      method: "DELETE",
      body: JSON.stringify(productinfo),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();

  return data;
};

const getPhotos = async (id) => {
  try {
    // const urlDomain = "http://localhost:5000";

    // const urlDomain =
    //   "https://us-central1-humbledonations.cloudfunctions.net/app";

    // const url = ;
    console.log(id);

    const response = await fetch(
      `https://us-central1-humbledonations.cloudfunctions.net/app/getPhoto/${id}`,
    );
    const data = response.json();
    console.log(response);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const CharityHomePage = () => {
  const location = useLocation();
  const userInfo = location.state;

  const [showProfile, setShowProfile] = useState(false);
  const [warning, setWarning] = useState(false);
  const [citieslist, setCitiesList] = useState([]);
  const [searchKey, setSearchKey] = useState(userInfo.city);
  let searchCity = useRef(null);

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

  useEffect(() => {
    getCitiesList().then((response) => {
      // console.log(response);
      setCitiesList(response);
    });
    return () => {}; // cleanup
  }, []); //reduce memory leaks

  // console.log(searchCity.current.value);

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
            <div className="chpsearchcity">
              {/* <p>City:</p> */}
              <select
                className="chpsearchbar"
                ref={searchCity}
                onChange={() => {
                  if (searchCity.current.value !== "")
                    setSearchKey(searchCity.current.value);
                  else {
                    setWarning(true);
                    setTimeout(() => {
                      setWarning(false);
                    }, 2000);
                  }
                  // console.log(searchCity.current.value);
                  // setSearchKey(searchCity.current.value);
                }}
              >
                {citieslist.sort().map((item, index) => {
                  return <option key={index}>{item}</option>;
                })}
              </select>
              {warning && <h5 className="chpwarning">Enter value to search</h5>}
            </div>
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
        {showProfile && <CharityProfile />}
        <ItemsContainer
          booli={navstyle.booli}
          city={userInfo.city}
          uid={userInfo.uid}
          searchKey={searchKey}
        />
      </div>
    </>
  );
};

const ItemsContainer = ({ uid, booli, searchKey }) => {
  const [products, setProducts] = useState({ status: 0, loading: true });
  const [reload, setReload] = useState(false);
  // console.log(searchKey);

  useEffect(() => {
    getItems(searchKey).then((response) => {
      if (response.status === 1) {
        const items = segregateItems(response.products, uid);

        setProducts({
          status: response.status,
          requestedProducts: items.req,
          nonReqProducts: items.noreq,
          acceptedRequests: items.reqaccepted,
          loading: false,
        });
      }
    });
  }, [searchKey, reload, uid]);
  // console.log(searchKey);

  return (
    <div>
      {products.loading ? (
        <div>
          <div className="loader"></div>
          Loading...
        </div>
      ) : (
        <>
          {products.status === 1 ? (
            <>
              {booli ? (
                <Items
                  products={products.nonReqProducts}
                  city={searchKey}
                  doneeuid={uid}
                  booli={booli}
                  reload={reload}
                  setReload={setReload}
                  msg="Items not available. Go to My Requests tab for requested Items"
                  header={"Donated Items"}
                />
              ) : (
                <>
                  <AcceptedItems
                    products={products.acceptedRequests}
                    doneeuid={uid}
                    city={searchKey}
                    booli={booli}
                  />
                  <Items
                    products={products.requestedProducts}
                    doneeuid={uid}
                    booli={booli}
                    city={searchKey}
                    setReload={setReload}
                    reload={reload}
                    msg="No requested items"
                    header="Requested Items"
                  />
                </>
              )}
            </>
          ) : (
            <h3>Server Error!!</h3>
          )}
        </>
      )}
    </div>
  );
};

const segregateItems = (data, doneeuid) => {
  let req = [];
  let reqaccepted = [];
  let noreq = [];

  // console.log(data, doneeuid);

  data.forEach((donor) => {
    // console.log(donor);
    donor.products.forEach((item) => {
      let booli = false;

      if (item.donated.status === false) {
        item.requests.forEach((id) => {
          if (doneeuid === id.doneeuid) {
            req.push({ uid: donor.uid, item });
            booli = true;
          }
        });
        if (booli === false) {
          noreq.push({ uid: donor.uid, item });
        }
      } else if (item.donated.status && item.donated.uid === doneeuid) {
        reqaccepted.push({ uid: donor.uid, item });
      }
    });
  });
  // console.log(req, noreq, reqaccepted);
  return { req, noreq, reqaccepted };
};

const CharityProfile = () => {
  const location = useLocation();
  const userInfo = location.state;
  const history = useNavigate();
  const [certificate, setCertificate] = useState({ status: false, urls: [] });
  const { name, address, city, postcode, phoneNo, email } = location.state;

  useEffect(() => {
    getCertificates(email).then((response) => {
      setCertificate(response);
    });
  }, [email]);

  return (
    <>
      <div className="displayProfile">
        <div className="charityProfileHead">
          <h1>Profile</h1>
        </div>
        <div className="editdiv">
          <Link to={"/CharityProfile"} state={userInfo}>
            <button className="editbutton">Edit</button>
          </Link>
        </div>
        <div className="chpdetails">
          <div className="details">
            <div className="field">
              <label>Name</label>
              <input type="text" value={name} readOnly />
            </div>
            <div className="field">
              <label>Address</label>
              <input type="text" value={address} readOnly />
            </div>
            <div className="field">
              <label>City</label>
              <input type="text" value={city} readOnly />
            </div>
            <div className="field">
              <label>Postcode</label>
              <input type="text" value={postcode} readOnly />
            </div>
            <div className="field">
              <label>Phone</label>
              <input type="text" value={phoneNo} readOnly />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="text" value={email} readOnly />
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
        <div>
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
    </>
  );
};

const Items = ({
  products,
  city,
  doneeuid,
  booli,
  setReload,
  reload,
  msg,
  header,
}) => {
  // console.log(products);
  return (
    <>
      {products.length === 0 ? (
        <div className="chpnoitems">
          <div className="chploading">{msg}</div>
        </div>
      ) : (
        <>
          <div className="chpaccitemheader">
            <p>{header}</p>
          </div>
          <div className="chpdonateditemscontainer">
            {products.map((singleitem, index) => {
              // console.log(index);
              const { item, uid } = singleitem;
              return (
                <Item
                  item={item}
                  uid={uid}
                  index={index}
                  booli={booli}
                  city={city}
                  setReload={setReload}
                  reload={reload}
                  doneeuid={doneeuid}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

const Item = ({
  item,
  uid,
  index,
  booli,
  setReload,
  reload,
  city,
  doneeuid,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="chpitem" key={index}>
      <Images photos={item.photos} />
      <div className="chpitemfooter">
        <div className="chpitemdetails">
          <p className="chpitemname">{item.productName}</p>
          <p className="chpitemaddress">{item.city}</p>
        </div>
        {loading ? (
          <div>
            <div className="loader"></div>
            Loading...
          </div>
        ) : (
          <>
            {booli ? (
              <button
                className="chprequestbutton"
                onClick={() => {
                  setLoading(true);
                  sendRequestToDonor(city, uid, doneeuid, item.productId).then(
                    (response) => {
                      setReload(!reload);
                    },
                  );
                }}
              >
                Request
              </button>
            ) : (
              <div className="chpdelreqbtn">
                <button
                  className="logout"
                  onClick={() => {
                    console.log("Deleting...");
                    setLoading(true);
                    const data = {
                      uid,
                      doneeuid,
                      productId: item.productId,
                      city: item.city,
                    };

                    deletRequest(data).then((response) => {
                      console.log(response);
                      if (response.status) {
                        setReload(!reload);
                      }
                    });
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const AcceptedItems = ({ products }) => {
  const [donorsData, setDonorsData] = useState({ status: 0 });

  // console.log({ products });

  useEffect(() => {
    getDonorsData(products).then((response) => {
      // console.log(response);
      setDonorsData(response);
    });
  }, [products]);

  // console.log(donorsData);

  return (
    <>
      {products.length > 0 && (
        <div className="chpaccitemscontainer">
          {donorsData.status ? (
            <>
              <div className="chpaccitemheader">
                <p>Accepted Items</p>
              </div>
              {products.map((item, index) => {
                // console.log(donorsData);
                return (
                  <>
                    <div className="chpitem" key={index}>
                      <div className="chpitemleft">
                        <Images photos={item.item.photos} />
                        <div className="chpitemfooter" key={index}>
                          <p className="chpitemname">{item.item.productName}</p>
                          <p className="chpitemaddress">{item.item.address}</p>
                        </div>
                      </div>
                      <div className="chpaccitemright">
                        <div className="chpaccdonorheader">
                          <p>Donor Information</p>
                        </div>

                        <div className="dhplabel"> Name: </div>
                        <div className="dhpvalue">
                          {donorsData.donorsData[0].Name}
                        </div>

                        <div className="dhplabel">Phone No:</div>
                        <div className="dhpvalue">
                          {donorsData.donorsData[0].Phone}
                        </div>

                        <div className="dhplabel">Email:</div>
                        <div className="dhpvalue">
                          {donorsData.donorsData[0].Email}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <div>
              <div className="loader"></div>
              Loading
            </div>
          )}
        </div>
      )}
    </>
  );
};

const Images = ({ photos }) => {
  const [allImages, setAllImages] = useState({ status: 0, noimage: 0 });
  useEffect(() => {
    if (photos.length) {
      setAllImages({ status: 0, noimage: 0 });
      convertbuff(photos).then((response) => {
        console.log(response);
        setAllImages({ status: 1, response });
      });
    } else {
      setAllImages({ status: 1, noimage: 1 });
    }
  }, [photos]);
  return (
    <div className="chpproductimagesdiv">
      {allImages.status ? (
        allImages.response.map((photo, index) => {
          return (
            <img
              src={`data:image/png;base64,${photo}`}
              alt="Product"
              key={index}
              className="chpproductimg"
              onClick={() => {
                var newTab = window.open();
                newTab.document.body.innerHTML = `<img src=${`data:image/png;base64,${photo}`} height="100%">`;
              }}
            />
          );
        })
      ) : (
        <>
          {allImages.noimage ? (
            <img src={userImage} alt="noimage" />
          ) : (
            <div>
              <div className="loader"></div>
              Loading...
            </div>
          )}
        </>
      )}
    </div>
  );
};

const convertbuff = async (photos) => {
  let photoarray = [];
  for (let i = 0; i < photos.length; i++) {
    const response = await getPhotos(photos[i]);
    console.log(response);
    if (response.status === 1) {
      const onlybuff = response.photoBuffer.map((buff) => {
        return Buffer.from(buff.data);
      });
      const base64img = Buffer.concat(onlybuff);
      photoarray.push(base64img.toString("base64"));
    }
  }
  return photoarray;
};

export default CharityHomePage;
