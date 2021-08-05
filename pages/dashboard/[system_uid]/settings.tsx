import { useState } from "react";
import { useEffect } from "react";
import { ChangeEvent } from "react";
import WithAuth from "../../../components/Auth/WithAuth";
import NavbarLeft from "../../../components/Templates/NavbarLeft";
import { UserJwt } from "../../../interface/user.interface";

interface Props {
  dataUser: UserJwt;
}

const Settings: React.FC<Props> = ({ dataUser }) => {
  const [systemWork, setSystemWork] = useState<string>("");

  useEffect(() => {
    console.log(systemWork);
    setSystemWork(localStorage.getItem("system-work") || "automatic");
  }, [systemWork]);

  // function
  const handleLanguage = () => {};

  const handleSystemWork = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    localStorage.setItem("system-work", e.target.value.toLowerCase());
    setSystemWork(e.target.value.toLowerCase());
  };

  const handleStatus = () => {};

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
                <select name="language" id="language" onChange={handleLanguage}>
                  <option value="idn">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="flex justify-between mt-14">
                <span className="text-primary">Automatic/Manual For System Works</span>
                <select name="systemWork" id="systemWork" onChange={handleSystemWork} value={systemWork}>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="flex justify-between mt-14">
                <span className="text-primary">Status</span>
                <select name="status" id="status" onChange={handleStatus}>
                  <option>On</option>
                  <option>Off</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Settings);
