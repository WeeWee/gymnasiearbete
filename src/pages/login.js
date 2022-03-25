import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "../firebase/clientapp";
import { AuthContext } from "../components/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import Circleloader from "../components/circleloader";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
// function SignInScreen() {
// 	// console.log(auth.currentUser != null);
// 	return (
// 		<div className="pt-20 flex flex-col items-center justify-center">
// 			{currentUser === null ? <RenderLogin /> : <AlreadyLoggedIn />}
// 		</div>
// 	);
// }

const RenderLogin = () => {
  const googleProvider = new GoogleAuthProvider();
  const githubrovider = new GithubAuthProvider();
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailNotification, setresetEmailNotification] = useState("");
  const [sentReset, setSentReset] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, SetShowPassword] = useState(false);
  const [checkLightMode, setLightMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const router = useRouter();

  const { currentUser, loading, SignInGoogle, SignInGithub } =
    useContext(AuthContext);

  const ShowPasswordToggle = (e) => {
    e.preventDefault();
    SetShowPassword(!showPassword);
  };
  const ResetPasswordFunc = (e) => {
    e.preventDefault();
    setResetEmail(e.target.value);
    setSentReset(false);
  };
  useEffect(() => {
    localStorage.getItem("theme") == "dark"
      ? setLightMode(true)
      : setLightMode(false);
  }, []);
  if (loading) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl">
          <Circleloader />
        </h1>
      </div>
    );
  }
  if (currentUser) {
    router.push("/");
    return (
      <div className="pt-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl">
          Hi {currentUser.displayName} you are logged in!
        </h1>
      </div>
    );
  }
  return (
    <div className=" pt-16 h-screen">
      <img
        src="login.svg"
        alt="login image"
        className="h-screen z-0 fixed w-screen object-scale-down text-transparent object-left"
      ></img>
      <div className=" filter blur-0 my-20 w-96 mx-auto  h-4/5 flex flex-col items-center rounded-lg bg-transparent z-20">
        <h1 className="pt-5 text-3xl">Login</h1>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => {
              SignInGoogle();
            }}
            className=" hover:bg-gray-200 shadow md:w-56 flex flex-row justify-center items-center mt-2 border border-gray-800 rounded-lg text-center"
          >
            <img
              className="ml-1 h-4 w-4"
              src="google icon.png"
              alt="google"
            ></img>
            <h1 className="pl-1 pr-1 text-sm md:text-lg ">Login with Google</h1>
          </button>
          <button
            onClick={() => {
              SignInGithub();
            }}
            className="hover:bg-gray-200 px-1 shadow md:w-56 flex flex-row justify-center items-center mt-2  border border-gray-800 rounded-lg text-center"
          >
            <img
              className=" h-4 w-4"
              src={"github dark.png"}
              alt="github"
            ></img>

            <h1 className="text-sm md:text-lg pl-1 pr-1 ">Login with Github</h1>
          </button>

          <div className="border border-gray-600 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow bg-white">
            <input
              className="pl-2 w-48 text-black rounded-lg outline-none"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex border border-gray-600 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow bg-white">
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
              <EyeIcon
                className={showPassword ? "w-4 h-4 hidden" : "w-4 h-4 "}
              />
              <EyeOffIcon
                className={showPassword ? "w-4 h-4 " : "w-4 h-4 hidden"}
              />
            </button>
          </div>
          <button
            className=" hover:text-gray-400"
            onClick={() =>
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  setLoggedIn(userCredential.currentUser);
                  setUserDoc(userCredential.currentUser, db);
                })
                .catch((error) => {
                  let errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage + " code: " + errorCode);
                  if (errorCode == "auth/wrong-password") {
                    alert("Wrong Password.");
                  } else if ((errorCode = "auth/currentUser-not-found")) {
                    alert("User not found!");
                  }
                })
            }
          >
            Login
          </button>
          <div className={loggedIn ? "" : "hidden"}> Logged in!</div>
        </div>
        <div className="fixed md:bottom-24 bottom-20 text-center">
          <div className="border border-gray-600 rounded-lg max-w-xs w-52 pr-2 mt-2 bg-white">
            <input
              className="pl-2 w-48 text-black rounded-lg outline-none"
              type="email"
              placeholder="reset email"
              value={email}
              onChange={(e) => {
                ResetPasswordFunc(e);
              }}
            />
          </div>
          <button
            className="hover:text-gray-400 "
            onClick={() =>
              sendPasswordResetEmail(auth, resetEmail).then(() => {
                setSentReset(true);
                setresetEmailNotification(resetEmail);
                setResetEmail("");
              })
            }
          >
            Reset Password
          </button>

          <h1>
            {sentReset
              ? "Password reset has sent to " + resetEmailNotification
              : ""}
          </h1>
        </div>
      </div>
    </div>
  );
};
/* export async function getStaticProps(context) {
  return {
    props: {
      navlinks: [{ name: "Home", path: "/" }],
    },
  };
} */
export default RenderLogin;
