/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { UserJwt } from "../../interface/user.interface";

interface Props {
  dataUser?: UserJwt;
}

const Navbar: React.FC<Props> = ({ dataUser }) => {
  return (
    <div className="w-full shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center py-3 w-wrapper m-auto">
        <span>
          <Link href="/">
            <a>
              <h1>LOGO</h1>
            </a>
          </Link>
        </span>
        <div>
          {dataUser ? (
            // login view
            <ul className="flex">
              <li className="mr-8">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="mr-8">
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              {dataUser.user_role === "superadmin" ? (
                <li className="mr-8">
                  <Link href="/system/create">
                    <a>Create System</a>
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="">
                <a href="/signout">Signout</a>
              </li>
            </ul>
          ) : (
            // not login view
            <ul className="flex">
              <li className="mr-8">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="mr-8">
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li className="">
                <Link href="/signin">
                  <a>Signin</a>
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
