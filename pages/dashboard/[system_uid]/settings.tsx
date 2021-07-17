import React from "react";
import WithAuth from "../../../components/Auth/WithAuth";
import NavbarLeft from "../../../components/Templates/NavbarLeft";
import { UserJwt } from "../../../interface/user.interface";

interface Props {
  dataUser: UserJwt;
}

const Settings: React.FC<Props> = ({ dataUser }) => {
  return (
    <div className="grid grid-cols-12">
      <NavbarLeft dataUser={dataUser} />
      <div className="col-span-10 bg-gray-100 min-h-screen">
        <div className="w-wrapper m-auto mt-5">
          <div className="bg-white p-7 rounded-xl shadow-xl">
            <h1 className="text-center text-xl font-bold uppercase">Settings</h1>
            <form>
              <div className="flex justify-between">
                <span className="text-primary">Languange</span>
                <select name="language" id="language">
                  <option value="idn">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="flex justify-between mt-14">
                <span className="text-primary">Automatic/Manual For System Works</span>
                <select name="systemWork" id="systemWork">
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
              <div className="flex justify-between mt-14">
                <span className="text-primary">Status</span>
                <select name="status" id="status">
                  <option>On</option>
                  <option>Off</option>
                </select>
              </div>
              <div className="flex justify-center mt-10 w-full">
                <button className="btn" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Settings);
