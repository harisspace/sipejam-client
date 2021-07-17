import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getSpecificSystem } from "../../../api/system.request";
import WithAuth from "../../../components/Auth/WithAuth";
import Loader from "../../../components/Templates/Loader";
import NavbarLeft from "../../../components/Templates/NavbarLeft";
import { UserJwt } from "../../../interface/user.interface";
import Image from "next/image";
import { MdPlace } from "react-icons/md";

interface Props {
  dataUser: UserJwt;
}

const Detail: React.FC<Props> = ({ dataUser }) => {
  const { system_uid } = useRouter().query;

  const { data, isError, isLoading } = useQuery(
    ["system", system_uid],
    async () => getSpecificSystem(system_uid as string),
    {
      enabled: !!system_uid,
    }
  );

  return (
    <div className="grid grid-cols-12">
      <NavbarLeft dataUser={dataUser} />
      <div className="col-span-10 bg-gray-100 min-h-screen">
        <div className="w-wrapper m-auto mt-5">
          <div className="bg-white p-7 rounded-xl shadow-xl">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="text-center text-xl font-bold uppercase">{data?.data.name}</h1>
                <span className="flex justify-center items-center text-xs text-primary">
                  <MdPlace />
                  <span>{data?.data.placed}</span>
                </span>

                <div className="flex mb-3 justify-center h-64 mt-7">
                  <Image
                    width={300}
                    height={200}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${data?.data.image_uri}`}
                    alt={data?.data.name}
                  />
                </div>
                <div>
                  <span>Created By</span>

                  <div className="flex mt-5">
                    <div className="w-14 h-14">
                      {/* <Image /> */}
                      <Image
                        width={100}
                        height={100}
                        className="rounded-full bg-white max-w-full h-full w-full align-middle border-none shadow"
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${data?.data.users.image_uri}`}
                        alt={data?.data.name}
                      />
                    </div>
                    <div className="flex flex-col ml-3">
                      <span>{data?.data.users.username}</span>
                      <span className="text-xs text-primary">{data?.data.users.created_at}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Detail);
