/* eslint-disable @next/next/no-html-link-for-pages */
import { AiOutlineHome, AiOutlineProfile, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { User } from "../../interface/user.interface";
import Image from "next/image";
import { useContext } from "react";
import { DashboardLinkContext } from "../../contextApi/context/dashboardLink.context";

interface Props {
  dataUser: User;
}

const NavbarLeft: React.FC<Props> = ({ dataUser: { image_uri, username } }) => {
  const [path, setPath] = useState("");

  const { dispatchDashboardLink } = useContext(DashboardLinkContext);

  return (
    <>
      <div className="col-span-2">
        <div className="flex flex-col items-center p-6 shadow-sm">
          <div className="flex flex-wrap justify-center">
            <div className="w-20 h-18">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${image_uri}`}
                width={100}
                height={100}
                alt="user profile"
                className={classNames("shadow rounded-full max-w-full h-full w-full align-middle border-none")}
              />
            </div>
          </div>
          <span>{username}</span>
        </div>

        <div className="flex flex-col mt-8">
          <ul className="w-full text-center">
            <li className={classNames("mb-3 flex justify-center items-center", { "bg-gray-400": path === "/" })}>
              <AiOutlineHome />
              <Link href="/">
                <a className="ml-2">Home</a>
              </Link>
            </li>
            <li className={classNames("mb-3 flex justify-center items-center", { "bg-gray-400": path === "/" })}>
              <AiOutlineProfile />
              <a className="ml-2 cursor-pointer" onClick={(e) => dispatchDashboardLink({ type: "PROFILE" })}>
                Detail System
              </a>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "dashboard",
              })}
            >
              <RiDashboardLine />
              <a className="ml-2 cursor-pointer" onClick={(e) => dispatchDashboardLink({ type: "DASHBOARD" })}>
                Dashboard
              </a>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "graphics",
              })}
            >
              <BsGraphUp />
              <a className="ml-2 cursor-pointer" onClick={(e) => dispatchDashboardLink({ type: "GRAPHICS" })}>
                Graphics
              </a>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "settings",
              })}
            >
              <IoSettingsOutline />
              <a className="ml-2 cursor-pointer" onClick={(e) => dispatchDashboardLink({ type: "SETTINGS" })}>
                Settings
              </a>
            </li>
            <li className="mb-3 flex justify-center items-center">
              <AiOutlineLogout />
              <a href="/signout">Signout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarLeft;
