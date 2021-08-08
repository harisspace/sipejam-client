import { MdPlace } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { RequestToBeAdminDto, System } from "../../interface/system.interface";
import { User, UserJwt } from "../../interface/user.interface";
import Image from "next/image";
import { MouseEvent } from "react";
import { useMutation } from "react-query";
import { requestToBeAdmin } from "../../api/system.request";
import { RequestToBeAdminEnum } from "../../helpers/system.enum";
import Notification from "../Notification";

interface Props {
  dataSystem: System;
  user: User;
  isAdmin: boolean;
  fromUser: UserJwt;
}

const SystemCard: React.FC<Props> = ({
  dataSystem: { placed, name, image_uri, system_uid, system_maker },
  user: { username },
  isAdmin,
  fromUser,
}) => {
  const { mutate, isSuccess, isError } = useMutation((data: RequestToBeAdminDto) => requestToBeAdmin(data));

  const handleJoinSystem = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({
      payload: system_uid,
      to_uid: system_maker,
      from_uid: fromUser.user_uid,
      message: `${fromUser.username} want join tobe admin ${name} system`,
      title: RequestToBeAdminEnum.Title,
    });
  };
  return (
    <>
      {isSuccess ? <Notification message="Request success send" /> : ""}
      {isError ? <Notification message="Request already send, please wait for confirmation" /> : ""}
      <div className="w-wrapper m-auto">
        <div className="sm:grid bg-white sm:grid-cols-4 rounded-lg mt-10 sm:w-3/6 m-auto sm:py-5 sm:px-4">
          <div className="mr-5 sm:col-span-1 w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${image_uri}`}
              alt={name}
              className="rounded-lg sm:rounded-none"
              height={100}
              layout="responsive"
              width={100}
            />
          </div>
          <div className="ml-3 flex flex-col justify-between sm:col-span-2">
            <div className="flex flex-col items-center sm:items-start sm:flex-none">
              <a className="font-bold uppercase text-xl" href={`/system/${system_uid}`}>
                {name}
              </a>
              <span className="flex text-sm text-primary">
                <MdPlace />
                <span>{placed}</span>
              </span>
            </div>
            <div className="items-center sm:items-start">
              <span className="flex justify-center sm:justify-start text-sm text-secondary">
                <RiAdminLine />
                <span>{username}</span>
              </span>
            </div>
          </div>
          <div className="col-span-1">
            {isAdmin ? (
              <button className="bg-green-500 text-white w-full py-1 px-6 active:bg-gray-500 font-bold rounded-xl">
                <a href={`/dashboard/${system_uid}`}>Dashboard</a>
              </button>
            ) : (
              <button
                onClick={handleJoinSystem}
                className="bg-green-500 text-white w-full py-1 px-6 active:bg-gray-500 font-bold rounded-xl"
              >
                <a>Join</a>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemCard;
