import SettingsPage from "../../components/settings";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebase from "../../firebase/clientapp";
import Circleloader from "../../components/circleloader";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../../components/auth";
import { isAssetError } from "next/dist/client/route-loader";

/* const DeleteUser = (currentUser, db) => {
	deleteUser(currentUser).then(() => {
		deleteDoc(doc(db, "users", currentUser.uid));
	});
}; */
/* const getData = async (currentUser, db) => {
	const docRef = doc(db, "users", currentUser.uid);
	const querySnapshot = await getDoc(docRef);
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
}; */
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
const Account = () => {
  const router = useRouter();
  const storage = getStorage(firebase);
  //const [currentUser, loading, error] = useAuthState(auth);
  const { currentUser, loading, UpdateFireBase, UpdateField } =
    useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  let prevFirstName = usePrevious(firstName);
  const [lastName, setLastName] = useState("");
  let prevLastName = usePrevious(lastName);
  const [userName, setUserName] = useState("");
  let prevUsername = usePrevious(userName);
  const [about, setAbout] = useState("");
  let prevAbout = usePrevious(about);
  const [phoneNumber, setPhoneNumber] = useState("");
  let prevPhonenumber = usePrevious(phoneNumber);
  const [country, setCountry] = useState("");
  let prevCountry = usePrevious(country);
  const [email, setEmail] = useState("");
  let prevEmail = usePrevious(email);
  const [imageLink, setImageLink] = useState(currentUser?.photoURL);
  let prevImageLink = usePrevious(imageLink);
  let fileInput = useRef(null);
  let file = null;
  const UploadImage = (image) => {
    file = ref(storage, "images/" + image);
    console.log(file.fullPath);
    const metadata = {
      contentType: file.type,
    };
    const uploadTask = uploadBytesResumable(file, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done " + snapshot.state);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageLink(downloadURL);
        });
      }
    );
  };
  const SaveFunction = (
    e,
    firstName,
    lastName,
    userName,
    about,
    phoneNumber,
    country,
    email,
    imageLink
  ) => {
    e.preventDefault();
    /*     if (
      firstName !== prevFirstName ||
      lastName !== prevLastName ||
      userName !== prevUsername ||
      about !== prevAbout ||
      phoneNumber !== prevPhonenumber ||
      country !== prevCountry ||
      email !== prevEmail ||
      imageLink !== prevImageLink
    ) { */
    if (firstName + " " + lastName != " ") {
      UpdateField("displayName", firstName + " " + lastName);
      currentUser.displayName = firstName + " " + lastName;
      console.log(currentUser.displayName);
    }
    if (userName != "") {
      UpdateField("userName", userName);
    }
    if (about != "") {
      UpdateField("about", about);
    }

    if (phoneNumber != "") {
      UpdateField("phoneNumber", phoneNumber);
    }
    if (imageLink != "") {
      UpdateField("photoURL", imageLink);
    }
    /*  UpdateFireBase(
        firstName,
        lastName,
        userName,
        about,
        phoneNumber,
        country,
        email,
        imageLink
      ); */
    /* } */
    setFirstName("");
    setLastName("");
    setUserName("");
    setAbout("");
    setPhoneNumber("");
    setCountry("");
    setEmail("");
  };
  useEffect(() => {
    if (!currentUser && !loading) router.push("/login");
  }, []);
  useEffect(() => {
    setImageLink(currentUser?.photoURL);
  }, [currentUser?.photoURL]);
  /* useEffect(() => {
		if (currentUser) {
			if (
				currentUser.providerData[0].providerId === "google.com" ||
				currentUser.providerData[0].providerId === "github.com"
			) {
				currentUser.emailVerified = true;
				setUserDoc(currentUser, db);
			}
		}
	}); */
  /* useEffect(() => {
		if (currentUser) {
			//getData(currentUser, db);
			//changeImage(currentUser?.photoURL);
			setForceUpdate(false);
			console.log("EFFECT");
			console.log(currentUser);
			console.log("EFFECT");
		}
	}, [forceUpdate]);
 */
  /* console.log(imageLink);
	console.log(currentUser?.photoURL);
	console.log(currentUser); */
  if (currentUser && !currentUser.emailVerified) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center">
        {" "}
        <h1>Verify your email before you can change your settings</h1>{" "}
      </div>
    );
  }
  if (loading) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-3xl">
          {" "}
          <Circleloader />{" "}
        </h1>{" "}
      </div>
    );
  }
  if (currentUser && currentUser.emailVerified) {
    return (
      <div className=" h-full grid grid-cols-5 md:grid-cols-4 w-screen overflow-hidden md:overflow-y-auto">
        <SettingsPage />
        <div
          /* style={{ scrollPaddingTop: "80px" }} */
          className="h-full pt-16 w-auto col-start-3 col-span-3 md:col-start-2 md:col-span-3 text-left overflow-hidden"
        >
          <div className="mr-5 pr-2 mt-5">
            <h1 className="text-2xl font-bold">Account</h1>
            <div>
              <h1 className="text-lg font-medium  ">Profile</h1>
              <p className="text-base text-gray-500">information.. </p>
            </div>
            <div className="flex md:flex-row flex-col text-gray-800">
              <div className="flex flex-col pr-8 ">
                <h1>First name</h1>
                <div className="border border-gray-200 rounded-lg max-w-xs w-52 pr-2">
                  <input
                    className="pl-2 w-48 text-black rounded-lg outline-none"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      e.preventDefault();
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="">Last name</h1>
                <div className="border border-gray-200 rounded-lg max-w-xs w-52 pr-2">
                  <input
                    className="pl-2 w-48 text-black rounded-lg outline-none"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      e.preventDefault();
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <h1>Username</h1>
              <div className="border border-gray-200 rounded-lg max-w-xs w-auto">
                <input
                  className="pl-2 text-black rounded-lg outline-none"
                  placeholder="username"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <h1>Photo</h1>
              <div className="flex flex-row items-center">
                <img
                  className="border border-gray-200 text-transparent rounded-full w-10 h-10 object-cover"
                  src={imageLink}
                  alt="profile pic"
                ></img>
                <div className="flex flex-row ml-2">
                  <button
                    onClick={() => {
                      fileInput.current.click();
                    }}
                    className=" pl-2 border border-gray-200 rounded-lg mr-4 pr-2"
                  >
                    Change
                  </button>
                  <input
                    ref={fileInput}
                    className="hidden"
                    type="file"
                    onChange={(e) => {
                      const imageT = e.target.files[0];
                      if (imageT != null) UploadImage(imageT);
                    }}
                  />
                  <button
                    className=" rounded-lg mr-4 pr-2"
                    onClick={() => {
                      UploadImage("white pic.png");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b pb-2">
              <h1>About</h1>
              <div className="border border-gray-200 rounded-lg max-w-md w-auto h-14 mr-4">
                <textarea
                  className="pl-2 text-black rounded-lg outline-none h-full w-full resize-none overflow-x-hidden overflow-y-auto max-h-16 "
                  placeholder=""
                  type="text"
                  value={about}
                  onChange={(e) => {
                    e.preventDefault();
                    setAbout(e.target.value);
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 pt-3 pb-2">
                Brief description for your profile
              </p>
            </div>
            <div className="pt-4 border-b pb-4">
              <h1>Personal Information</h1>
              <p className="text-sm text-gray-600">
                This information will be displayed publicly
              </p>

              <div className="flex md:flex-row flex-col text-gray-800 pt-4 text-sm">
                <div className="flex flex-col pr-8 ">
                  <h1>Email adress</h1>
                  <div className="border border-gray-200 rounded-lg max-w-xs w-52">
                    <input
                      className="pl-2 text-black rounded-lg outline-none"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col pt-2 md:pt-0">
                  <h1 className="">Phone number</h1>
                  <div className="border border-gray-200 rounded-lg max-w-xs w-52">
                    <input
                      className="pl-2 text-black rounded-lg outline-none"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        e.preventDefault();
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex md:flex-row flex-col text-gray-800 pt-2 md:pt-4 text-sm">
                <div className="flex flex-col pr-8">
                  <h1>Country</h1>
                  <div className="border border-gray-200 rounded-lg max-w-xs w-52">
                    <input
                      className="pl-2 text-black rounded-lg outline-none"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        e.preventDefault();
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 pt-4">
                This account was created on {currentUser.metadata.creationTime}
              </p>
            </div>

            <div className="flex space-x-4 pt-4 w-full justify-end mb-2 md:pr-16">
              {/* <p className="text-xs justify-center items-center flex">
								Not saved
							</p> */}
              <button className="border border-gray-300 rounded-lg w-16 text-center flex flex-col ">
                <span className="px-2">Cancel</span>
              </button>
              <button
                onClick={(e) =>
                  SaveFunction(
                    e,
                    firstName,
                    lastName,
                    userName,
                    about,
                    phoneNumber,
                    country,
                    email,
                    imageLink
                  )
                }
                className=" bg-blue-500 text-white rounded-lg w-16 text-center flex flex-col "
              >
                <span className="px-2">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Account;
