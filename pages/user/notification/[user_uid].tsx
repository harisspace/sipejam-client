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
    <div className="bg-gradient-to-b from-primary via-secondary">
      <Navbar dataUser={dataUser} />
      {isLoading ? <Loader /> : ""}
      {data?.data && data.data.length > 0 ? (
        <NotificationCardList dataNotifications={data.data} refetch={refetch} />
      ) : (
        <h1>There is no notifications on you</h1>
      )}
    </div>
  );
};

export default WithAuth(NotificationPage);