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
import { useEffect } from "react";

interface Props {
  dataUser: UserJwt;
}

const NavbarLeft: React.FC<Props> = ({ dataUser: { image_uri, username } }) => {
  const router = useRouter();

  const [path, setPath] = useState<string>("");
  const { system_uid } = useRouter().query;

  useEffect(() => {
    if (!router.isReady) return;
    const pathNow = router.pathname.split("/")[3] || "dashboard";

    setPath(pathNow);
    console.log(pathNow);
  }, [router]);

  return (
    <>
      <div className="col-span-2 bg-gradient-to-b from-primary via-green-100 to-blue-400">
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
            <li className="mb-3 flex justify-center items-center hover:text-blue-500">
              <AiOutlineHome />
              <Link href="/">
                <a className="ml-2">Home</a>
              </Link>
            </li>
            <li className={classNames("mb-3 hover:text-blue-500", { "bg-gray-400": path === "detail" })}>
              <Link href={`/dashboard/${system_uid}/detail`}>
                <a className="flex justify-center items-center cursor-pointer">
                  <AiOutlineProfile />
                  <span className="ml-2">Detail System</span>
                </a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 hover:text-blue-500", {
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
              className={classNames("mb-3 flex justify-center items-center hover:text-blue-500", {
                "bg-gray-400": path === "graphics",
              })}
            >
              <Link href={`/dashboard/${system_uid}/graphics`}>
                <a className="cursor-pointer flex justify-center items-center hover:text-blue-500">
                  <BsGraphUp />
                  <span className="ml-2">Graphics</span>
                </a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 hover:text-blue-500", {
                "bg-gray-400": path === "settings",
              })}
            >
              <Link href={`/dashboard/${system_uid}/settings`}>
                <a className="cursor-pointer flex justify-center items-center hover:text-blue-500">
                  <IoSettingsOutline />
                  <span className="ml-2">Settings</span>
                </a>
              </Link>
            </li>
            <li className="mb-3 flex justify-center items-center hover:text-blue-500">
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
