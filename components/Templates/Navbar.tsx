/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { UserJwt } from "../../interface/user.interface";
import Image from "next/image";
import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { VscSignIn } from "react-icons/vsc";
import { BsQuestion } from "react-icons/bs";
import { Link as LinkScroll } from "react-scroll";

interface Props {
  dataUser?: UserJwt;
}

const Navbar: React.FC<Props> = ({ dataUser }) => {
  return (
    <div className="w-full shadow-md sticky top-0 z-10">
      <div className="flex justify-between sm:justify-end items-center py-3 sm:py-1 sm:text-sm w-wrapper m-auto">
        {dataUser ? (
          <div className="hover:text-blue-500">
            <Link href={`/user/${dataUser.user_uid}`}>
              <a className="flex items-center justify-center">
                <Image
                  className="rounded-full bg-white max-w-full h-full w-full align-middle border-none shadow"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${dataUser.image_uri}`}
                  width={30}
                  height={30}
                  alt={dataUser.username}
                />
                <span className="ml-2 whitespace-nowrap">{dataUser.username}</span>
              </a>
            </Link>
          </div>
        ) : (
          <span>
            <Link href="/">
              <a>
                <img className="w-28 object-contain" src="/sipejam-logo.png" alt="sipejam logo" />
              </a>
            </Link>
          </span>
        )}
        {/* mobile only */}
        {dataUser ? (
          <div className="sm:hidden hover:text-blue-500">
            <Link href="/signout">
              <a className="text-xl">
                <AiOutlineLogout />
              </a>
            </Link>
          </div>
        ) : (
          ""
        )}
        {/* ------------------------- */}
        <div className="left-0 fixed w-full bottom-0 py-4 sm:py-1 bg-white md:bg-transparent sm:static">
          {dataUser ? (
            // login view
            <ul className="flex justify-between sm:justify-end">
              <li className="sm:mr-8 hover:text-blue-500">
                <Link href="/">
                  <a className="flex flex-col items-center">
                    <AiOutlineHome />
                    <span className="hidden sm:block">Home</span>
                  </a>
                </Link>
              </li>
              <li className="sm:mr-8 hover:text-blue-500">
                <Link href="/system">
                  <a className="flex flex-col items-center">
                    <AiOutlineSearch />
                    <span className="hidden sm:block">Find System</span>
                  </a>
                </Link>
              </li>

              {dataUser.user_role === "superadmin" ? (
                <>
                  <li className="sm:mr-8 hover:text-blue-500">
                    <Link href="/system/create">
                      <a className="flex flex-col items-center">
                        <AiOutlinePlus />
                        <span className="hidden sm:block">Create System</span>
                      </a>
                    </Link>
                  </li>
                  <li className="sm:mr-8 hover:text-blue-500">
                    <Link href={`/system/usercreated/${dataUser.user_uid}`}>
                      <a className="flex flex-col items-center">
                        <IoCreateOutline />
                        <span className="hidden sm:block">System Created By Me</span>
                      </a>
                    </Link>
                  </li>
                  <li className="sm:mr-8 cursor-pointer hover:text-blue-500">
                    <Link href={`/user/notification/${dataUser.user_uid}`}>
                      <a className="flex flex-col items-center">
                        <IoIosNotificationsOutline />
                        <span className="hidden sm:block">Notification</span>
                      </a>
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
              <li className="hidden sm:block hover:text-blue-500">
                <a href="/signout" className="flex-col flex items-center">
                  <AiOutlineLogout />
                  <span>Signout</span>
                </a>
              </li>
            </ul>
          ) : (
            // not login view
            <ul className="flex w-wrapper sm:w-full m-auto justify-between sm:justify-end text-lg sm:text-sm">
              <li className="sm:mr-5 hover:text-blue-500">
                <Link href="/">
                  <a className="flex flex-col items-center">
                    <AiOutlineHome />
                    <span className="hidden sm:block">Home</span>
                  </a>
                </Link>
              </li>
              <li className="sm:mr-5 hover:text-blue-500">
                <LinkScroll to="about" smooth={true}>
                  <a className="flex flex-col items-center" href="#about">
                    <BsQuestion />
                    <span className="hidden sm:block">About</span>
                  </a>
                </LinkScroll>
              </li>
              <li className="hover:text-blue-500">
                <Link href="/signin">
                  <a className="flex flex-col items-center">
                    <VscSignIn />
                    <span className="hidden sm:block">Signin</span>
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
