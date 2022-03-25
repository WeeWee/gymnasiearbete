import SettingsPage from "../../components/settings";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../components/auth";
const Apperance = () => {
  const {
    currentUser,
    loading,
    UpdateFireBase,
    UpdateProfilePageField,
    GetDataFromProfile,
  } = useContext(AuthContext);
  const [header1, SetHeader1] = useState("");
  const [header2, SetHeader2] = useState("");
  const [header3, SetHeader3] = useState("");
  const [section1, SetSection1] = useState("");
  const [section2, SetSection2] = useState("");
  const [section3, SetSection3] = useState("");
  const [placeHolder1, setPlaceHolder1] = useState("");
  const [placeHolder2, setPlaceHolder2] = useState("");
  const [placeHolder3, setPlaceHolder3] = useState("");
  GetDataFromProfile("header1").then((res) => {
    setPlaceHolder1(res);
  });
  GetDataFromProfile("header2").then((res) => {
    setPlaceHolder2(res);
  });
  GetDataFromProfile("header3").then((res) => {
    setPlaceHolder3(res);
  });
  const placeholders = {
    placeholder1: placeHolder1,
    placeholder2: placeHolder2,
    placeholder3: placeHolder3,
  };

  const SaveFunction = (
    e,
    header1,
    header2,
    header3,
    section1,
    section2,
    section3
  ) => {
    e.preventDefault();
    if (header1 != "") {
      UpdateProfilePageField("header1", header1);
    }
    if (header2 != "") {
      UpdateProfilePageField("header2", header2);
    }
    if (header3 != "") {
      UpdateProfilePageField("header3", header3);
    }
    if (section1 != "") {
      UpdateProfilePageField("section1", section1);
    }
    if (section2 != "") {
      UpdateProfilePageField("section2", section2);
    }
    if (section3 != "") {
      UpdateProfilePageField("section3", section3);
    }

    SetHeader1("");
    SetHeader2("");
    SetHeader3("");
    SetSection1("");
    SetSection2("");
    SetSection3("");
  };
  return (
    <div className=" h-full grid grid-cols-5 md:grid-cols-4 w-screen overflow-hidden md:overflow-y-auto">
      <SettingsPage />
      <div className="h-full pt-16 w-auto col-start-3 col-span-3 md:col-start-2 md:col-span-3 text-left overflow-hidden">
        <div className="mr-5 pr-2 mt-5">
          <h1 className="text-2xl font-bold">Apperance</h1>

          <div className="flex flex-col pr-8 ">
            <div className="pt-2">
              <h1>Header 1</h1>
              <div className="border border-gray-200 rounded-lg max-w-xs w-52 pr-2">
                <input
                  className="pl-2 w-48 text-black rounded-lg outline-none"
                  type="text"
                  placeholder={placeholders.placeholder1}
                  value={header1}
                  onChange={(e) => {
                    e.preventDefault();
                    SetHeader1(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pl-4 pt-2">
              <h1>Text section 1</h1>
              <div className="border border-gray-200 rounded-lg max-w-md w-auto h-20 mr-4">
                <textarea
                  className="pl-2 text-black rounded-lg outline-none h-full w-full resize-none overflow-x-hidden overflow-y-auto max-h-16 "
                  placeholder=""
                  type="text"
                  value={section1}
                  onChange={(e) => {
                    e.preventDefault();
                    SetSection1(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="pt-2">
              <h1>Header 2</h1>
              <div className="border border-gray-200 rounded-lg max-w-xs w-52 pr-2">
                <input
                  className="pl-2 w-48 text-black rounded-lg outline-none"
                  type="text"
                  placeholder={placeholders.placeholder2}
                  value={header2}
                  onChange={(e) => {
                    e.preventDefault();
                    SetHeader2(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pl-4 pt-2">
              <h1>Text section 2</h1>
              <div className="border border-gray-200 rounded-lg max-w-md w-auto h-20 mr-4">
                <textarea
                  className="pl-2 text-black rounded-lg outline-none h-full w-full resize-none overflow-x-hidden overflow-y-auto max-h-16 "
                  placeholder=""
                  type="text"
                  value={section2}
                  onChange={(e) => {
                    e.preventDefault();
                    SetSection2(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="pt-4 flex flex-col">
            <div className="pt-2">
              <h1>Header 3</h1>
              <div className=" border border-gray-200 rounded-lg max-w-xs w-52 pr-2">
                <input
                  className="pl-2 w-48 text-black rounded-lg outline-none"
                  type="text"
                  placeholder={placeholders.placeholder3}
                  value={header3}
                  onChange={(e) => {
                    e.preventDefault();
                    SetHeader3(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pl-4 pt-2">
              <h1>Text section 3</h1>
              <div className="border border-gray-200 rounded-lg max-w-md w-auto h-20 mr-4">
                <textarea
                  className="pl-2 text-black rounded-lg outline-none h-full w-full resize-none overflow-x-hidden overflow-y-auto max-h-16 "
                  placeholder=""
                  type="text"
                  value={section3}
                  onChange={(e) => {
                    e.preventDefault();
                    SetSection3(e.target.value);
                  }}
                />
              </div>
            </div>
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
                  header1,
                  header2,
                  header3,
                  section1,
                  section2,
                  section3
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
};

export default Apperance;
