import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { createSystemRequest } from "../../api/system.request";
import WithAuth from "../../components/Auth/WithAuth";
import Loader from "../../components/Templates/Loader";
import Navbar from "../../components/Templates/Navbar";
import { CreateSystemDto } from "../../interface/system.interface";
import Notification from "../../components/Notification";
import { UserJwt } from "../../interface/user.interface";

interface Props {
  dataUser: UserJwt;
}

const Create: React.FC<Props> = ({ dataUser }) => {
  const [name, setName] = useState("");
  const [placed, setPlaced] = useState("");
  const [image, setImage] = useState(Object);

  const { mutate, isLoading, isError, error, isSuccess } = useMutation((formData: any) =>
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

  return (
    <>
      {isLoading ? <Loader /> : ""}
      {isError ? <Notification message={(error as any)?.response.data.message} /> : ""}
      {isSuccess ? <Notification message="System created" /> : ""}
      <div>
        <Navbar dataUser={dataUser} />
        <div className="shadow-xl w-1/3 rounded-xl m-auto p-5 mt-10 bg-primary">
          <h1 className="text-center text-xl">Create New System</h1>
          <form onSubmit={handleSubmit}>
            <div className="m-auto text-sm mt-3">
              <label htmlFor="name">Name*</label>
              <input type="text" className="input" id="name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="m-auto text-sm mt-3">
              <label htmlFor="place">Place*</label>
              <input
                className="input"
                name="placed"
                type="text"
                id="place"
                onChange={(e) => setPlaced(e.target.value)}
              />
            </div>
            <div className="m-auto text-sm mt-3">
              <label htmlFor="image">Upload Image*</label>
              <input className="block" type="file" id="image" onChange={handleImageChange} />
            </div>
            <div className="flex justify-center">
              <input type="submit" className="btn bg-white" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WithAuth(Create);
