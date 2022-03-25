import React, { useState, useRef } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import firebase from "../firebase/clientapp";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import Circleloader from "../components/circleloader";
const setUserDoc = async (user, db) => {
  await setDoc(
    doc(db, "users", user.uid),
    {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      provider: user.providerData[0].providerId,
      uid: user.uid,
    },
    { merge: true }
  );
};
export default function Signup() {
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);
  const [signedUp, setSignedUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [showPassword, SetShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef();
  const ShowPasswordToggle = (e) => {
    e.preventDefault();
    SetShowPassword(!showPassword);
  };
  if (loading) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl">
          <Circleloader />
        </h1>
      </div>
    );
  }
  if (user && !signedUp) {
    console.log(user);
    return (
      <div className="pt-20">
        <h1>Hi {user?.name} you have already signed up!</h1>
      </div>
    );
  }
  if (user && signedUp) {
    return (
      <div className="pt-20">
        <h1>Hi {user?.name} you have signed up!</h1>
        <h2>
          Change your profile information in the{" "}
          <Link href="/settings">
            <a className="hover:text-gray-400">settings!</a>
          </Link>
        </h2>
        <h3>We have sent you a verification mail, pls verify your email!</h3>
      </div>
    );
  }
  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <h2 className="pt-2"> </h2>
      <Link href="/login">
        <a className="flex flex-row text-center items-center">
          Login with{" "}
          <img
            src="google icon.png"
            alt="google"
            className="mx-1 h-4 w-4"
          ></img>
          or
          <img
            src="github dark.png"
            alt="github"
            className="ml-1 h-4 w-4"
          ></img>
        </a>
      </Link>
      <form autoComplete="off" className="pt-6">
        <h1 className="text-sm text-center">Enter Email and Password: </h1>
        <div
          ref={emailRef}
          className=" border border-gray-200 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow"
        >
          <input
            className="pl-2 w-44 text-black rounded-lg outline-none"
            //type={showPassword ? "text" : "password"}
            type="email"
            placeholder="email"
            value={email}
            autoComplete="email"
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.currentTarget.value);
            }}
          />
        </div>
        <div className="flex border border-gray-200 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow">
          <input
            className="pl-2 w-44 text-black rounded-lg outline-none"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => {
              e.preventDefault();

              setPassword(e.currentTarget.value);
            }}
          />
          <button
            type="submit"
            className=""
            onClick={(e) => ShowPasswordToggle(e)}
          >
            <EyeIcon className={showPassword ? "w-4 h-4 hidden" : "w-4 h-4 "} />
            <EyeOffIcon
              className={showPassword ? "w-4 h-4 " : "w-4 h-4 hidden"}
            />
          </button>
        </div>
      </form>
      <button
        className=" bg-green text-white  rounded-lg my-4 shadow-lg text-center items-center"
        onClick={() =>
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              setUserDoc(userCredential.user, db);
              setSignedUp(true);
              sendEmailVerification(userCredential.user);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              //console.log(errorMessage + " code: " + errorCode);
              if (
                errorCode == "auth/email-already-in-use" ||
                "auth/missing-email"
              ) {
                emailRef.current.className =
                  " rounded-lg max-w-xs w-52 pr-2 mt-2 shadow border border-red-600";
                emailRef.current.children[0].focus();
              }
            })
        }
      >
        <h1 className="px-2">Sign up</h1>
      </button>

      <h2 className={user ? "" : "hidden"}>created!</h2>
    </div>
  );
}
