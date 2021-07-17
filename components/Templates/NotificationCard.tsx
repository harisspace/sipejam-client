import { AxiosResponse } from "axios";
import Image from "next/image";
import React, { MouseEvent } from "react";
import { QueryObserverResult, useMutation } from "react-query";
import { addAdminSystem } from "../../api/system.request";
import { updateUserNotificationReadTrue } from "../../api/user.request";
import { AddAdminDto } from "../../interface/system.interface";
import { INotification } from "../../interface/user.interface";
import Notification from "../Notification";
import Loader from "./Loader";

interface Props {
  dataNotification: INotification;
  refetch: () => Promise<QueryObserverResult<AxiosResponse<any>, unknown>>;
}

const NotificationCard: React.FC<Props> = ({ dataNotification, refetch }) => {
  const { isLoading, isSuccess, mutate } = useMutation((data: AddAdminDto) => addAdminSystem(data));
  const { mutate: mutateNotif, isLoading: isLoadingNotif } = useMutation((notification_uid: string) =>
    updateUserNotificationReadTrue(notification_uid)
  );

  const handleAccept = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(
      { system_uid: dataNotification.payload, user_uid: dataNotification.from_uid },
      {
        onSuccess: () => {
          mutateNotif(dataNotification.notification_uid);
          refetch();
        },
      }
    );
  };

  const handleDecline = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutateNotif(dataNotification.notification_uid, { onSuccess: () => refetch() });
  };

  return (
    <>
      {isLoading ? <Loader /> : ""}
      {isSuccess ? <Notification message="Add admin success" /> : ""}
      <div className="grid bg-white grid-cols-6 rounded-lg mt-10 w-3/6 m-auto py-5 px-4">
        {/* left */}
        <div className="col-span-1">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${dataNotification.users_notifications_from_uidTousers.image_uri}`}
            className="object-contain"
            width={50}
            height={50}
            alt={dataNotification.users_notifications_from_uidTousers.username}
          />
        </div>
        {/* center */}
        <div className="col-span-4">
          <span className="text-lg block">{dataNotification.title}</span>
          <span className="text-primary">{dataNotification.message}</span>
        </div>
        {/* right */}
        <div className="col-span-1 flex flex-col items-center">
          <button className="btn" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
