/* eslint-disable @next/next/no-html-link-for-pages */
import { AiOutlineHome, AiOutlineProfile, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { UserJwt } from "../../interface/user.interface";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  dataUser: UserJwt;
}

const NavbarLeft: React.FC<Props> = ({ dataUser: { image_uri, username } }) => {
  const [path, setPath] = useState("");
  const { system_uid } = useRouter().query;

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
            <li className={classNames("mb-3", { "bg-gray-400": path === "/" })}>
              <Link href={`/dashboard/${system_uid}/detail`}>
                <a className="flex justify-center items-center cursor-pointer">
                  <AiOutlineProfile />
                  <span className="ml-2">Detail System</span>
                </a>
              </Link>
            </li>
            <li
              className={classNames("mb-3", {
                "bg-gray-400": path === "dashboard",
              })}
            >
              <Link href={`/dashboard/${system_uid}`}>
                <a className="cursor-pointer flex justify-center items-center">
                  <RiDashboardLine />
                  <span className="ml-2">Dashboard</span>
                </a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "graphics",
              })}
            >
              <Link href={`/dashboard/${system_uid}/graphics`}>
                <a className="cursor-pointer flex justify-center items-center">
                  <BsGraphUp />
                  <span className="ml-2">Graphics</span>
                </a>
              </Link>
            </li>
            <li
              className={classNames("mb-3", {
                "bg-gray-400": path === "settings",
              })}
            >
              <Link href={`/dashboard/${system_uid}/settings`}>
                <a className="cursor-pointer flex justify-center items-center">
                  <IoSettingsOutline />
                  <span className="ml-2">Settings</span>
                </a>
              </Link>
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
