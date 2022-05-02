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
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
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
  const { auth, email, password } = prop;
  // console.log(email, password);
  const user = await createUserWithEmailAndPassword(auth, email, password);
  // console.log(user);
  const userid = user.user.uid;
  return userid;
};

export const CharityRegister = async (prop) => {
  const { email, password } = prop;
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const userid = user.user.uid;
  return userid;
};

export const emailVerification = async () => {
  await sendEmailVerification(auth.currentUser).then((resp) => {
    alert(
      "Verification link sent to your email. Kindly check to verify your account.",
    );
  });
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
    // console.log(error);
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

    return { status: 1 };
  } catch (error) {
    console.log(error);
    return { status: 0 };
  }
}

export const getDoneeData = async (requests) => {
  let donees = [];
  const doneeRef = ref(getDatabase());

  for (let i = 0; i < requests.length; i++) {
    const donee = await get(child(doneeRef, `users/${requests[i].doneeuid}`));
    if (donee.exists()) {
      donees.push(donee.val());
    }
  }
  // console.log(donees);
  return { status: 1, donees };
};

export const getSingleDonee = async (uid) => {
  try {
    const dbRef = ref(getDatabase());
    const userData = await get(child(dbRef, `users/${uid}`));
    if (userData.exists()) {
      return { status: 1, donee: userData.val() };
    }
  } catch (error) {
    return { status: 0 };
  }
};

export const getDonorsData = async (products) => {
  // console.log(products);
  try {
    const donorRef = ref(getDatabase());
    let donorsData = [];
    for (let i = 0; i < products.length; i++) {
      // console.log(products[i].uid);
      const donor = await get(child(donorRef, `users/${products[i].uid}`));
      if (donor.exists()) {
        // console.log(donor.val());
        donorsData.push(donor.val());
      }
    }
    return { status: 1, donorsData };
  } catch (error) {
    console.log(error);
  }
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

export const logout = async () => {
  try {
    await signOut(auth);

    return { status: 1 };
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (email) => {
  const sender = await sendPasswordResetEmail(auth, email);
  console.log(sender);
};

export function isGoodPassword(password) {

  let rules = [
    "Capital Case letters",
    "Small Case letters",
    "Numbers",
    "Special Characters",
    "Minimum Password length is 6 characters"
  ];

  if (password.match(/[a-z]+/)) {
    rules = rules.filter((e) => e !== "Small Case letters");
  }

  if (password.match(/[A-Z]+/)) {
    rules = rules.filter((e) => e !== "Capital Case letters");
  }

  if (password.match(/[0-9]+/)) {
    rules = rules.filter((e) => e !== "Numbers");
  }

  if (password.match(/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/)) {
    rules = rules.filter((e) => e !== "Special Characters");
  }

  if (password.toString().length > 6) {
    rules = rules.filter((e) => e !== "Minimum Password length is 6 characters");
  }

  return rules;
}
