import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Fragment, Menu, Transition } from "@headlessui/react";
export default function Searchbar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/profile/${inputValue}`);
  };
  /* const inputHandler = (e) => {
    e.preventDefault();
    const obj = {
      username: inputValue,
    };
    //list.push(obj);
    localStorage.setItem(JSON.stringify("searchHistory", list));
    setInputValue("");
  }; */
  return (
    <div
      id="search"
      className={
        " md:pt-1 flex-shrink-0 flex items-center focus:border focus:border-red-500"
        /* : "mt-20 z-10 right-0 hidden" */
      }
    >
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="bg-white flex items-center rounded-xl shadow-xl md:w-52 xs:w-36 xxs:w-40 max-h-7 dark:border dark:border-black">
          <input
            className="text-sm pl-2 md:pl-4 rounded-l-full w-full  max-w-md text-gray-700 leading-tight focus:outline-none"
            id="searchbar"
            type="text"
            placeholder="Profile Search"
            autoComplete="username"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" onSubmit={(e) => handleSubmit(e)}>
            <div className="p-4 pt-5">
              <SearchIcon
                className=" w-4 h-4 dark:text-black"
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
