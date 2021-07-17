import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteSystem, getSpecificSystem } from "../../api/system.request";
import WithAuth from "../../components/Auth/WithAuth";
import Loader from "../../components/Templates/Loader";
import Navbar from "../../components/Templates/Navbar";
import { UserJwt } from "../../interface/user.interface";
import Image from "next/image";
import { MdPlace } from "react-icons/md";
import Notification from "../../components/Notification";
import ReactModal from "../../components/Templates/ReactModal";
import { useContext } from "react";
import { ModalContext } from "../../contextApi/context/modal.context";
import { useEffect } from "react";

interface Props {
  dataUser: UserJwt;
}

const GetSystem: React.FC<Props> = ({ dataUser }) => {
  const { showModal, setShowModal, confirm } = useContext(ModalContext);

  const router = useRouter();
  const { system_uid } = router.query;

  const { isLoading, data, isError } = useQuery(
    ["system", system_uid],
    () => getSpecificSystem(system_uid as string),
    {
      enabled: !!system_uid,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const {
    mutate,
    isLoading: deleteLoading,
    isSuccess: deleteSuccess,
  } = useMutation((system_uid: string) => deleteSystem(system_uid));

  // function handle
  useEffect(() => {
    if (confirm) mutate(system_uid as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  const handleDeleteSystem = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      {deleteLoading ? <Loader /> : ""}
      {deleteSuccess ? <Notification message="Delete Success" /> : ""}
      {showModal ? (
        <ReactModal
          title="Are you sure want to delete this system?"
          body="Menghapus sistem akan menghapus segala setting dan IoT token"
        />
      ) : (
        ""
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white h-screen">
          <Navbar dataUser={dataUser} />
          <div className=" w-1/2 p-10 m-auto rounded-lg shadow-xl">
            {/* top */}
            <div className="flex items-center mb-8">
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
              <div className="ml-10">
                <h1 className="font-bold text-xl">{data?.data.name.toUpperCase()}</h1>

                <span className="text-xs text-primary">
                  Created by {data?.data.users.username} at {data?.data.created_at}
                </span>
              </div>

              {/* btn */}
              <div className="ml-5">
                <button className="btn">Update</button>
                {dataUser.user_uid === data?.data.system_maker ? (
                  <button className="btn" onClick={handleDeleteSystem}>
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>

              {/* <span className="text-xs text-primary flex items-center">
                <div className="flex text-xs items-center text-black mt-4">
                  <i className="inline text-xl text-primary">
                    <MdPlace />
                  </i>
                  <input
                    className="px-1 py-1 relative bg-white rounded text-xs border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    type="text"
                  />
                </div>
              </span> */}
            </div>
            {/* center */}
            <div className="flex mb-3 justify-center h-64">
              <Image
                width={300}
                height={200}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${data?.data.image_uri}`}
                alt={data?.data.name}
                // onClick={uploadImage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithAuth(GetSystem);
