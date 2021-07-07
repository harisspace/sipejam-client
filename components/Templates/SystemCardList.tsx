import SystemCard from "./SystemCard";
import { System } from "../../interface/system.interface";
import { User, UserJwt } from "../../interface/user.interface";

interface Props {
  dataUser: UserJwt;
  dataSystems: {
    system_uid: string;
    system_role: string;
    user_uid: string;
    systems: System;
    users: User;
  }[];
}

const SystemCardList: React.FC<Props> = ({ dataSystems }) => {
  return (
    <div>
      {dataSystems.map(({ users, systems }) => (
        <SystemCard dataSystem={systems} user={users} key={systems.system_uid} />
      ))}
    </div>
  );
};

export default SystemCardList;
