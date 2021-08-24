import Image from "next/image";
import Head from "next/head";
import React from "react";
import { useQuery } from "react-query";
import { getSystemsByUserNotAdmin } from "../../api/system.request";
import WithAuth from "../../components/Auth/WithAuth";
import Loader from "../../components/Templates/Loader";
import Navbar from "../../components/Templates/Navbar";
import SystemCard from "../../components/Templates/SystemCard";
import { SystemAndUser } from "../../interface/system.interface";
import { UserJwt } from "../../interface/user.interface";

interface Props {
  dataUser: UserJwt;
}

const System: React.FC<Props> = ({ dataUser }) => {
  const { isLoading, data, isSuccess } = useQuery(
    ["systems_user_not_admin", dataUser.user_uid],
    () => getSystemsByUserNotAdmin(dataUser.user_uid as string),
    { enabled: !!dataUser.user_uid, refetchOnWindowFocus: false }
  );

  return (
    <>
      <Head>
        <title>System</title>
        <meta property="og:title" content="System" />
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
      {isLoading ? <Loader /> : ""}
      <Navbar dataUser={dataUser} />
      <div className="bg-gray-100">
        {data?.data && data.data.length > 0 && isSuccess
          ? data.data.map((systemAndUser: SystemAndUser) => (
              <SystemCard
                isAdmin={false}
                user={systemAndUser.users}
                dataSystem={systemAndUser}
                key={systemAndUser.id}
                fromUser={dataUser}
              />
            ))
          : ""}
        {isSuccess && data?.data.length < 1 ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              className="object-contain"
              height={500}
              width={500}
              src="/images/empty.png"
              alt="You already admin all System"
            />
            <span>You already admin all system</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default WithAuth(System);
