import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../components/auth";
import Circleloader from "../../components/circleloader";
import { motion } from "framer-motion";
const Test = () => {
  const {
    currentUser,
    loading,
    GetDataFromField,
    GetDataFromProfile,
    testingSum,
  } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [header1, setHeader1] = useState("");
  const [header2, setHeader2] = useState("");
  const [header3, setHeader3] = useState("");
  const [section1, setSection1] = useState("");
  const [section2, setSection2] = useState("");
  const [section3, setSection3] = useState("");

  useEffect(() => {
    GetDataFromField("displayName").then((res) => {
      if (currentUser != null) {
        currentUser.displayName = res;
        setName(currentUser.displayName);
      }
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
  const imgVariants = {
    hidden: { x: "100vw" },
    show: {
      x: "0vw",
      transition: {
        ease: "easeOut",
        duration: 2,
      },
    },
  };
  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };
  return (
    <div className="pt-16 w-full h-full absolute">
      <div className="grid grid-cols-4 gap-2 h-full w-full overflow-y-auto">
        <div className="col-start-1 col-span-4 md:col-span-1 h-full pr-4 border-r border-gray-300">
          <div className="justify-center text-center h-full px-2 md:fixed">
            <div className=" mx-auto">
              <div className="mt-4">
                <div className="mx-auto w-32 h-32 rounded-full  border border-gray-600">
                  <motion.div
                    variants={imgVariants}
                    initial="hidden"
                    animate="show"
                  >
                    <img
                      src={currentUser?.photoURL}
                      alt="profile pic"
                      className="mx-auto object-cover justify-center items-center text-transparent w-32 h-32 rounded-full "
                    ></img>
                  </motion.div>
                </div>
              </div>
            </div>
            <h1 className="text-left pl-4 text-2xl font-semibold pt-2">
              {capitalizeFirstLetter(name)}
            </h1>
            <div className=" text-left pl-4 pt-4 ">
              <p className="text-sm pt-1">Mail: {currentUser?.email}</p>
              <p className="text-sm pt-1">
                Phone number:{" "}
                {currentUser?.phoneNumber ? currentUser?.phoneNumber : "none"}
              </p>
              <div className="w-full  h-20 border border-gray-300 rounded-md">
                <p className="text-sm py-1 px-2">{about}</p>
              </div>
              <p className="text-sm pt-1">
                {currentUser?.emailVerified
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
                <h1 className="text-2xl font-semibold pt-4">{header1}</h1>
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <p className=" break-words text-justify text-sm pt-8">
                    {section1}
                  </p>
                </motion.div>
              </div>
              <div className="">
                <h2 className="text-2xl font-semibold pt-4">{header2}</h2>
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <p className="break-words text-justify text-sm pt-8">
                    {section2}
                  </p>
                </motion.div>
              </div>
              <div className="">
                <h2 className="text-2xl font-semibold pt-4">{header3}</h2>
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <p className="break-words text-justify text-sm pt-8">
                    {section3}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
