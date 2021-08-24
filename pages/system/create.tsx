import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { createSystemRequest } from "../../api/system.request";
import WithAuth from "../../components/Auth/WithAuth";
import Loader from "../../components/Templates/Loader";
import Navbar from "../../components/Templates/Navbar";
import { CreateSystemDto } from "../../interface/system.interface";
import Notification from "../../components/Notification";
import { UserJwt } from "../../interface/user.interface";
import ReactModal from "../../components/Templates/ReactModal";
import ReactModalInfo from "../../components/Templates/ReactModalInfo";
import { useContext } from "react";
import { ModalContext } from "../../contextApi/context/modal.context";
import { useEffect } from "react";

interface Props {
  dataUser: UserJwt;
}

const Create: React.FC<Props> = ({ dataUser }) => {
  const [name, setName] = useState("");
  const [placed, setPlaced] = useState("");
  const [image, setImage] = useState(Object);

  const { setShowModal, showModal } = useContext(ModalContext);

  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation((formData: any) =>
    createSystemRequest(formData)
  );

  // function
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      console.log(e.target.files);
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("placed", placed);
    formData.append("system_maker", dataUser.user_uid);
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
    }
  }, [isSuccess, setShowModal]);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      {isError ? <Notification message={(error as any)?.response.data.message} /> : ""}
      {isSuccess ? <Notification message="System created" /> : ""}
      {showModal ? (
        <ReactModalInfo
          title="IoT Token"
          body="This is your IoT token for this system, dont tell anyone"
          inputValue={data?.data.iot_token}
        />
      ) : (
        ""
      )}
      <div>
        <Navbar dataUser={dataUser} />
        <div className="bg-gray-100 py-10">
          <div className="shadow-xl sm:w-2/3 rounded-xl m-auto p-5 bg-secondary">
            <h1 className="text-center text-xl">Create New System</h1>
            <form onSubmit={handleSubmit}>
              <div className="m-auto text-sm mt-3">
                <label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input type="text" className="input" id="name" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="m-auto text-sm mt-3">
                <label htmlFor="place">
                  Place <span className="text-red-500">*</span>
                </label>
                <input
                  className="input"
                  name="placed"
                  type="text"
                  id="place"
                  onChange={(e) => setPlaced(e.target.value)}
                />
              </div>
              <div className="m-auto text-sm mt-3">
                <label htmlFor="image">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <input className="block" type="file" id="image" onChange={handleImageChange} />
              </div>
              <div className="flex justify-center">
                <input type="submit" className="btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(Create);
