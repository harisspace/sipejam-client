import GoogleOAuth from "../components/Templates/GoogleOAuth";
import Notification from "../components/Notification";
import Link from "next/link";
import classNames from "classnames";
import { FormEvent, useState } from "react";
import { signupRequest } from "../api/user.request";
import { useMutation } from "react-query";
import Loader from "../components/Templates/Loader";
import { ISignup } from "../interface/user.interface";
import NoAuth from "../components/Auth/NoAuth";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isError, data, mutate, error } = useMutation((newUser: ISignup) => {
    return signupRequest(newUser);
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ username, email, password });
  };

  return (
    <>
      {!isLoading && data ? <Notification message="We will send you email, please confirm your account" /> : ""}
      {isLoading ? <Loader /> : ""}
      <div>
        <div>
          <div className="grid grid-cols-8 max-h-screen h-screen">
            <div className="col-span-2 bg-gradient-to-l from-primary to-secondary">
              <div className="bg-sistem h-screen bg-contain bg-no-repeat bg-center"></div>
            </div>

            <div className="col-span-6 flex items-center">
              <div className="ml-3 p-8 w-6/12 shadow-lg">
                <h1>LOGO</h1>
                <GoogleOAuth />

                <form className="w-11/12 mt-6" onSubmit={handleSubmit}>
                  <div className="mb-3 pt-0">
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={classNames("input")}
                    />
                  </div>
                  <div className="mb-3 pt-0">
                    <input
                      required
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      className={classNames("input")}
                    />
                  </div>
                  <div className="mb-3 pt-0">
                    <input
                      required
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                    />
                  </div>

                  {/* list when error occur */}
                  {isError && (error as any).response.data ? (
                    <div className="p-3 text-sm text-red-500">
                      <ul className="list-inside">
                        <li>{(error as any).response.data.message}</li>
                      </ul>
                    </div>
                  ) : null}

                  <span>
                    Sudah punya akun?, klik
                    <Link href="/signin">
                      <a className="text-blue-500"> di sini </a>
                    </Link>
                    untuk login
                  </span>
                  <input
                    type="submit"
                    className="mt-3 cursor-pointer block bg-secondary text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoAuth(Signup);
