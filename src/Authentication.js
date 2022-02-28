const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

var { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAeMyQZyT1JzbZQXYGc6ivmL_WH9li1YC0",
  authDomain: "humbledonations.firebaseapp.com",
  databaseURL: "https://humbledonations-default-rtdb.firebaseio.com",
  projectId: "humbledonations",
  storageBucket: "humbledonations.appspot.com",
  messagingSenderId: "1040315989123",
  appId: "1:1040315989123:web:87394f4c9510a34ba52fb6",
  measurementId: "G-CWD05HG677",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const DonorRegister = async (prop) => {
  const { email, password } = prop;
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const userid = user.user.uid;
  console.log(userid);
  return userid;
};

export const CharityRegister = async (prop) => {
  try {
    const { email, password } = prop;
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userid = user.user.uid;
    console.log(userid);

    return userid;
  } catch (error) {
    console.log(error);
  }
};

const database = getDatabase(app);

export async function writeUserData(
  userId,
  name,
  address,
  city,
  postcode,
  email,
  phone,
  type,
) {
  try {
    await set(ref(database, "users/" + userId), {
      Name: name,
      Address: address,
      City: city,
      Postcode: postcode,
      Email: email,
      Phone: phone,
      type: type,
    });

    console.log("Write Successful...");
  } catch (error) {
    console.log(`${error}`, "line 65");
  }
}
