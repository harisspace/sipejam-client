import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUserNotification } from "../../../api/user.request";
import WithAuth from "../../../components/Auth/WithAuth";
import Loader from "../../../components/Templates/Loader";
import Navbar from "../../../components/Templates/Navbar";
import NotificationCard from "../../../components/Templates/NotificationCard";
import NotificationCardList from "../../../components/Templates/NotificationCardList";
import { INotification, UserJwt } from "../../../interface/user.interface";
import Image from "next/image";

interface Props {
  dataUser: UserJwt;
}

const NotificationPage: React.FC<Props> = ({ dataUser }) => {
  const { isLoading, data, refetch } = useQuery(
    ["notification", dataUser!.user_uid],
    () => getUserNotification(dataUser!.user_uid),
    {
      enabled: !!dataUser.user_uid,
    }
  );

  return (
    <div>
      <Navbar dataUser={dataUser} />
      {isLoading ? <Loader /> : ""}
      <div className="bg-gray-100">
        {data?.data && data.data.length > 0 ? (
          <NotificationCardList dataNotifications={data.data} refetch={refetch} />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              className="object-contain"
              height={500}
              width={500}
              src="/images/empty.png"
              alt="You already admin all System"
            />
            <span>There is no notification, happy good day</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithAuth(NotificationPage);
