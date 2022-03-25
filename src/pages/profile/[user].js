import { useContext, useState, useEffect } from "react";
import { AuthContext, Query } from "../../components/auth";
import Circleloader from "../../components/circleloader";
import firebase from "../../firebase/clientapp";
import { getFirestore } from "firebase/firestore";
const User = ({ SearchQuery, userData }) => {
  const {
    currentUser,
    loading,
    GetDataFromField,
    GetDataFromProfile,
    testingSum,
  } = useContext(AuthContext);
  const [about, setAbout] = useState("");
  const [header1, setHeader1] = useState("");
  const [header2, setHeader2] = useState("");
  const [header3, setHeader3] = useState("");
  const [section1, setSection1] = useState("");
  const [section2, setSection2] = useState("");
  const [section3, setSection3] = useState("");
  useEffect(() => {
    GetDataFromField("displayName").then((res) => {
      if (currentUser != null) currentUser.displayName = res;
    });
    GetDataFromField("about").then((res) => {
      setAbout(res);
    });
    GetDataFromProfile("header1").then((res) => {
      setHeader1(res);
    });
    GetDataFromProfile("header2").then((res) => {
      setHeader2(res);
    });
    GetDataFromProfile("header3").then((res) => {
      setHeader3(res);
    });
    GetDataFromProfile("section1").then((res) => {
      setSection1(res);
    });
    GetDataFromProfile("section2").then((res) => {
      setSection2(res);
    });
    GetDataFromProfile("section3").then((res) => {
      setSection3(res);
    });
  });
  const capitalizeFirstLetter = (string) => {
    if (string != undefined)
      return string.charAt(0).toUpperCase() + string.slice(1);
  };
  /* if (UserData.error != "") {
    return (
      <div className="pt-20 px-20">
      <h1 className="text-4xl font-semibold">
      This programmer is shit, u should not use this website
        </h1>
        </div>
        );
      } */
  console.log("user ", userData);
  if (!userData) {
    return (
      <div className="pt-20 flex flex-col items-center w-screen h-screen">
        <h1>&quot;{SearchQuery}&quot; is not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-16 w-full h-full absolute">
      <div className="grid grid-cols-4 gap-2 h-full w-full overflow-y-auto">
        <div className="col-start-1 col-span-4 md:col-span-1 h-full pr-4 border-r border-gray-300">
          <div className="justify-center text-center h-full px-2 md:fixed">
            <div className=" mx-auto">
              <img
                src={userData?.photoURL}
                alt="profile pic"
                className="mx-auto object-cover justify-center items-center text-transparent w-32 h-32 mt-4 rounded-full "
              ></img>
            </div>
            <h1 className="text-left pl-4 text-2xl font-semibold pt-2">
              {capitalizeFirstLetter(userData?.displayName)}
            </h1>
            <div className=" text-left pl-4 pt-4 ">
              <p className="text-sm pt-1">Mail: {userData?.email}</p>
              <p className="text-sm pt-1">
                Phone number:{" "}
                {userData?.phoneNumber ? userData?.phoneNumber : "none"}
              </p>
              <div className="w-full  h-20 border border-gray-300 rounded-md">
                <p className="text-sm py-1 px-2">{userData.about}</p>
              </div>
              <p className="text-sm pt-1">
                {userData?.emailVerified
                  ? "User is verified"
                  : "User is not verified"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-4 md:col-start-2 md:col-span-3 h-full ">
          <div className=" justify-center text-center h-full px-2">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h1 className="text-2xl font-semibold pt-4">
                  {userData.header1}
                </h1>
                <p className=" break-words text-justify text-sm pt-8">
                  {userData.section1}
                </p>
              </div>
              <div className="">
                <h2 className="text-2xl font-semibold pt-4">
                  {userData.header2}
                </h2>
                <p className="break-words text-justify text-sm pt-8">
                  {userData.section2}
                </p>
              </div>
              <div className="">
                <h2 className="text-2xl font-semibold pt-4">
                  {userData.header3}
                </h2>
                <p className="break-words text-justify text-sm pt-8">
                  {userData.section3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

export async function getServerSideProps(ctx) {
  const SearchQuery = { ...ctx.query };
  console.log(SearchQuery.user);
  let result = null;
  const res = await getData(SearchQuery);
  console.log("outside resss", res);
  return {
    props: {
      SearchQuery: SearchQuery.user,
      userData: res,
    },
  };
}
const getData = async (searchQuery) => {
  const res = await Query(searchQuery.user);
  return res;
};
