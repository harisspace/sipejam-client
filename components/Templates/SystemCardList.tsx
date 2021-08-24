import SystemCard from "./SystemCard";
import { System } from "../../interface/system.interface";
import { User, UserJwt } from "../../interface/user.interface";

interface Props {
  dataSystems: {
    system_uid: string;
    system_role: string;
    user_uid: string;
    systems: System;
    users: User;
  }[];
  dataUser: UserJwt;
}

const SystemCardList: React.FC<Props> = ({ dataSystems, dataUser }) => {
  return (
    <>
      {dataSystems.map(({ users, systems }) => (
        <SystemCard
          fromUser={dataUser}
          isAdmin={true}
          dataSystem={systems}
          user={users}
          key={systems.system_uid}
        />
      ))}
    </>
  );
};

export default SystemCardList;
