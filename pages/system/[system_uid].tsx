import { useRouter } from "next/router";
import React, { MouseEvent, useState, ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSystem, getSpecificSystem, updateSystem, uploadSystemImage } from "../../api/system.request";
import WithAuth from "../../components/Auth/WithAuth";
import Loader from "../../components/Templates/Loader";
import Navbar from "../../components/Templates/Navbar";
import { UserJwt } from "../../interface/user.interface";
import Image from "next/image";
import Notification from "../../components/Notification";
import ReactModal from "../../components/Templates/ReactModal";
import { useContext } from "react";
import { ModalContext } from "../../contextApi/context/modal.context";
import { useEffect } from "react";
import { MdPlace } from "react-icons/md";
import { UpdateSystemVariables, UploadSystemImageVariables } from "../../interface/system.interface";
import { useRef } from "react";
import classNames from "classnames";

interface Props {
  dataUser: UserJwt;
}

const GetSystem: React.FC<Props> = ({ dataUser }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { showModal, setShowModal, confirm } = useContext(ModalContext);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState("");
  const [placedValue, setPlacedValue] = useState("");

  const queryClient = useQueryClient();

  const router = useRouter();
  const { system_uid } = router.query;

  const { isLoading, data, isSuccess } = useQuery(
    ["system", system_uid],
    () => getSpecificSystem(system_uid as string),
    {
      enabled: !!system_uid,
    }
  );

  const {
    mutate,
    isLoading: deleteLoading,
    isSuccess: deleteSuccess,
  } = useMutation((system_uid: string) => deleteSystem(system_uid));

  const { mutate: mutateUpdate, isLoading: updateLoading } = useMutation(
    (updateSystemVariables: UpdateSystemVariables) => updateSystem(updateSystemVariables),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(["system", system_uid], data);
      },
    }
  );

  const { mutate: mutateUploadImage, isSuccess: isSuccessUploadImage } = useMutation(
    (uploadImageVariables: UploadSystemImageVariables) => uploadSystemImage(uploadImageVariables),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(["system", system_uid], data);
      },
    }
  );

  // function handle
  useEffect(() => {
    if (confirm) mutate(system_uid as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  useEffect(() => {
    if (data && isSuccess) {
      setNameValue(data.data.name);
      setPlacedValue(data.data.placed);
    }
  }, [data, isSuccess]);

  const handleDeleteSystem = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSave = () => {
    // save to db
    mutateUpdate({ system_uid: system_uid as string, updateData: { name: nameValue, placed: placedValue } });
    setIsUpdate(false);
  };

  const handleUpload = (e: MouseEvent<HTMLImageElement>) => {
    // check is update
    if (!isUpdate) return;

    inputRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      mutateUploadImage({ system_uid: system_uid as string, imageFile: formData });
    }
  };

  return (
    <>
      {deleteLoading ? <Loader /> : null}
      {deleteSuccess ? <Notification message="Delete Success" /> : null}
      {showModal ? (
        <ReactModal
          title="Are you sure want to delete this system?"
          body="Menghapus sistem akan menghapus segala setting dan IoT token"
        />
      ) : null}

      {isLoading && !data ? (
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
              <div className="ml-10 flex flex-col">
                {isUpdate ? (
                  <input
                    className="input"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                  ></input>
                ) : (
                  <h1 className="font-bold text-xl">{data?.data.name.toUpperCase()}</h1>
                )}

                {isUpdate ? (
                  <input
                    className="input"
                    value={placedValue}
                    onChange={(e) => setPlacedValue(e.target.value)}
                  ></input>
                ) : (
                  <div className="flex">
                    <MdPlace />
                    <span className="text-xs text-primary">{data?.data.placed}</span>
                  </div>
                )}

                <span className="text-xs text-primary">
                  Created by {data?.data.users.username} at {data?.data.created_at}
                </span>
              </div>

              {/* btn */}
              <div className="ml-5">
                {dataUser.user_role === "admin" || dataUser.user_role === "superadmin" ? (
                  isUpdate ? (
                    <button className="btn" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button className="btn" onClick={() => setIsUpdate(true)}>
                      Update
                    </button>
                  )
                ) : (
                  ""
                )}
                {dataUser.user_uid === data?.data.system_maker ? (
                  <button className="btn" onClick={handleDeleteSystem}>
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>

              {/* handle image upload */}
              <input type="file" className="hidden" ref={inputRef} onChange={handleInputChange} name="image" />
            </div>
            {/* center */}
            <div className="flex mb-3 justify-center h-64">
              <Image
                width={300}
                height={200}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${data?.data.image_uri}`}
                alt={data?.data.name}
                className={classNames({ "cursor-pointer": isUpdate })}
                onClick={handleUpload}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithAuth(GetSystem);
