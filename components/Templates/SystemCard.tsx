import { MdPlace } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { System } from "../../interface/system.interface";
import { User } from "../../interface/user.interface";
import Image from "next/image";

interface Props {
  dataSystem: System;
  user: User;
}

const SystemCard: React.FC<Props> = ({
  dataSystem: { placed, name, image_uri, system_uid },
  user: { username },
}) => {
  return (
    <div>
      <div className="grid bg-white grid-cols-4 rounded-lg mt-10 w-3/6 m-auto py-5 px-4">
        <div className="mr-5 col-span-1">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${image_uri}`}
            alt={name}
            height={100}
            width={100}
          />
        </div>
        <div className="flex flex-col justify-between col-span-2">
          <div>
            <a className="font-bold uppercase text-xl">{name}</a>
            <span className="flex items-center text-sm text-primary">
              <MdPlace />
              <span className="ml-1">{placed}</span>
            </span>
          </div>
          <div className="">
            <span className="flex items-center text-sm text-secondary">
              <RiAdminLine />
              <span className="ml-1">{username}</span>
            </span>
          </div>
        </div>
        <div className="col-span-1">
          <button className="bg-green-500 text-white w-full py-1 px-6 active:bg-gray-500 font-bold rounded-xl">
            <a href={`/dashboard/${system_uid}`}>Dashboard</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemCard;