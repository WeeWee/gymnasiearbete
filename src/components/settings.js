import Link from "next/link";
import {
  CogIcon,
  PhotographIcon,
  KeyIcon,
  BellIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
const Settings = () => {
  const router = useRouter();
  const pages = [
    {
      name: "Account",
      icon: CogIcon,
      desc: "Change information..",
      path: "/settings/account",
    },
    {
      name: "Notification",
      icon: BellIcon,
      desc: "Change notifications..",
      path: "/settings/notification",
    },
    {
      name: "Security",
      icon: KeyIcon,
      desc: "Change password..",
      path: "/settings/security",
    },
    {
      name: "Apperance",
      icon: PhotographIcon,
      desc: "Change personal page..",
      path: "/settings/apperance",
    },
  ];
  return (
    <div
      /* style={{ scrollPaddingTop: "80px" }} */
      className="h-full w-auto pt-20 col-start-1 col-span-2 md:col-span-1  border-r border-gray-200 text-left fixed"
    >
      <div className="w-full h-full  ">
        <div className="w-full border-b border-gray-200 ">
          <h1 className="text-lg font-semibold ml-2 md:ml-5">Settings</h1>
        </div>
        {/* <ul className="w-full border-b border-gray-200 text-base font-semibold"> */}
        <ul className="w-full text-xs sm:text-sm md:text-base font-semibold list-none">
          {pages.map((i) => (
            <div
              key={i.name}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <li className="ml-2 mr-2 md:ml-5 my-auto pt-1 pb-2 ">
                <Link href={i.path}>
                  <a className=" ">
                    <div className="flex flex-row items-center">
                      <div
                        className={
                          router.pathname == i.path
                            ? "w-4 h-4 text-blue-500"
                            : "w-4 h-4 text-black"
                        }
                      >
                        <i.icon></i.icon>
                      </div>
                      <h1>{i.name}</h1>
                    </div>
                    <p className="font-normal text-xs md:text-sm break-words mx-auto text-left text-gray-600">
                      {i.desc}
                    </p>
                  </a>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Settings;
