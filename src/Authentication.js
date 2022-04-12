import {
  getStorage,
  list,
  getDownloadURL,
  ref as ref_storage,
} from "firebase/storage";
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

var { getDatabase, ref, set, get, child } = require("firebase/database");

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
const database = getDatabase();

export const DonorRegister = async (prop) => {
  const { email, password } = prop;
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const userid = user.user.uid;
  return userid;
};

export const CharityRegister = async (prop) => {
  try {
    const { email, password } = prop;
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userid = user.user.uid;
    // console.log(userid);
    return userid;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    const dbRef = ref(getDatabase());
    const userData = await get(child(dbRef, `users/${response.user.uid}`));
    if (userData.exists()) {
      return {
        status: true,
        loading: false,
        userData: userData.val(),
        uid: response.user.uid,
      };
    }
  } catch (error) {
    console.log(error);
    return { status: false, loading: false, msg: error.code };
  }
};

// Realtime Databse
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

export const getSingleDonee = async (uid) => {
  const dbRef = ref(getDatabase());
  const userData = await get(child(dbRef, `users/${uid}`));
  return userData.val();
};

export const getCertificates = async (email) => {
  let url = [];

  const storage = getStorage();

  const certURL = await getDownloadURL(
    ref_storage(storage, `certificates/${email}`),
  ).then((url) => {
    return url;
  });
  url.push(certURL);

  const otherPics = await ref_storage(storage, `photos/${email}/`);
  const lister = await list(otherPics);

  for (let i = 0; i < lister.items.length; i++) {
    const picURL = await getDownloadURL(
      ref_storage(storage, `photos/${email}/${i}`),
    );
    url.push(picURL);
  }

  return { status: true, urls: url };
};
