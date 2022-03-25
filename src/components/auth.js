import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import firebase from "../firebase/clientapp";
import {
  getAuth,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  snapshotEqual,
  getDocs,
  query,
  where,
} from "firebase/firestore";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);
  const [currentUser, setCurrentUser] = useState();
  const [about, setAbout] = useState(null);
  //const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
        //setLoading(false);
      }
    });
  }, []);
  const UpdateFireBase = (
    firstName,
    lastName,
    userName,
    about,
    phoneNumber,
    country,
    email,
    imageLink
  ) => {
    setCurrentUser({
      ...currentUser,
      displayName: firstName + " " + lastName,
      photoURL: imageLink,
      phoneNumber: phoneNumber,
    });
    setDoc(
      doc(db, "users", currentUser.uid),
      {
        displayName: firstName + " " + lastName,
        email: currentUser.email,
        phoneNumber: phoneNumber,
        about: about,
        emailVerified: currentUser.emailVerified,
        photoURL: imageLink,
        provider: currentUser.providerData[0].providerId,
        uid: currentUser.uid,
        userName: userName,
        lastSignin: currentUser.metadata.lastSignInTime,
      },
      { merge: true }
    );
  };

  const UpdateField = (fieldName, value) => {
    setCurrentUser({ ...currentUser, [fieldName]: value });
    updateDoc(doc(db, "users", currentUser.uid), {
      [fieldName]: value,
    });
  };
  const UpdateProfilePageField = (fieldName, value) => {
    setDoc(
      doc(db, "users", currentUser.uid),
      {
        profilepage: { [fieldName]: value },
      },
      { merge: true }
    );
  };
  const CreateFireBase = ({ user }) => {
    setDoc(doc(db, "users", currentUser.uid), {
      displayName: user.displayName,
      email,
      emailVerified,
      photoURL,
      provider,
      uid,
    });

    if (currentUser.uid == querySnapshot.data().uid) {
      updateProfile(currentUser, {
        displayName: querySnapshot.data().displayName,
        photoURL: querySnapshot.data().photoURL,
      }).finally(() => {
        console.log(currentUser);
      });
      if (
        currentUser.email != querySnapshot.data().email &&
        querySnapshot.data().provider != "google.com"
      )
        updateEmail(currentUser, querySnapshot.data().email).then(() => {
          console.log("email updated");
        });
    }
  };
  const GetDoc = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const snap = await getDoc(docRef);
    return snap.data();
  };
  const GetDataFromField = async (fieldName) => {
    if (currentUser != null) {
      let data = null;
      await GetDoc().then(function (result) {
        if (result != null && result != undefined) data = result[fieldName];
      });
      return data;
    }
  };
  const GetDataFromProfile = async (fieldName) => {
    if (currentUser != null) {
      let data = null;
      await GetDoc().then(function (result) {
        if (result != null && result != undefined)
          if (
            result["profilepage"] != null &&
            result["profilepage"] != undefined
          )
            data = result["profilepage"][fieldName];
      });
      return data;
    }
  };
  const CreateFirebase = (user) => {
    setCurrentUser(user);
    setDoc(doc(db, "users", currentUser.uid), {
      displayName: currentUser.displayName,
      email: currentUser.email,
      emailVerified: currentUser.emailVerified,
      photoURL: currentUser.photoURL,
      provider: currentUser.providerData[0].providerId,
      uid: currentUser.uid,
      signedUp: currentUser.metadata.creationTime,
      lastSignin: currentUser.metadata.lastSignInTime,
    });
  };

  const SignIn = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        console.log(provider);
        const credential = provider.credentialFromResult(result);
        const token = credential.accessToken;
        setLoggedIn(result.user);
        CreateFirebase();
        console.log(router);
        router.push("/");
      })
      .catch((error) => {
        let errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage + " code: " + errorCode);
        if (errorCode == "auth/account-exists-with-different-credential") {
          alert(
            "You have an account with different credential! try using google or sign in!"
          );
        }
      });
  };
  const SignInGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    SignIn(googleProvider);
  };
  const SignInGithub = () => {
    const githubrovider = new GithubAuthProvider();
    SignIn(githubrovider);
  };
  const SIGNOUT = () => {
    setCurrentUser([]);
    signOut(auth)
      .then(() => {
        console.log("logged out");
        router.push("/").finally(() => {
          router.reload();
        });
      })
      .catch(() => {
        console.error("logged out error");
      });
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        about,
        UpdateFireBase,
        UpdateField,
        UpdateProfilePageField,
        SIGNOUT,
        GetDataFromField,
        GetDataFromProfile,
        SignInGithub,
        SignInGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const Query = async (user) => {
  const db = getFirestore(firebase);
  const q = query(collection(db, "users"), where("userName", "==", user));
  let result = null;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result = doc.data();
    console.log("doc");
  });
  //console.log("result", querySnapshot.docs);
  return result;
};
