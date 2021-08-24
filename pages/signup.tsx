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
import Head from "next/head";

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
      <Head>
        <title>Signup</title>
        <meta property="og:title" content="Signup" />
        <meta
          name="description"
          content="SIPEJAM atau Sistem Pintar Pengatur jalan merupakan sebuah sistem yang digunakan untuk mengatur dan memberikan keamanan pengendara di tikungan tajam"
        />
        <meta
          name="keywords"
          content="SIPEJAM, PKM-KC, PIMNAS, tikungan tajam, computer vision, internet of things, sistem pintar pengatur jalan, sipejamunand.com"
        />
        <meta
          name="og:description"
          content="SIPEJAM atau Sistem Pintar Pengatur jalan merupakan sebuah sistem yang digunakan untuk mengatur dan memberikan keamanan pengendara di tikungan tajam"
        />
        <meta name="og:site_name" content="sipejamunand.com" />
        <meta name="og:url" content="sipejamunand.com" />
      </Head>
      {!isLoading && data ? <Notification message="We will send you email, please confirm your account" /> : ""}
      {isLoading ? <Loader /> : ""}
      <div>
        <div>
          <div className="md:grid md:grid-cols-8 max-h-screen h-screen">
            <div className="sm:col-span-2 bg-gradient-to-l from-primary to-secondary hidden lg:block">
              <div className="bg-sistem h-screen bg-contain bg-no-repeat bg-center"></div>
            </div>

            <div className="md:col-span-6 flex items-center lg:justify-start sm:justify-center">
              <div className="ml-3 p-8 sm:w-full lg:w-6/12 shadow-lg mt-5">
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
                  <input type="submit" className="btn mt-5" />
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
