import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { getSystemsByUserCreatedSystem } from "../../../api/system.request";
import WithAuth from "../../../components/Auth/WithAuth";
import Loader from "../../../components/Templates/Loader";
import Navbar from "../../../components/Templates/Navbar";
import SystemCard from "../../../components/Templates/SystemCard";
import { SystemAndUser } from "../../../interface/system.interface";
import { UserJwt } from "../../../interface/user.interface";

interface Props {
  dataUser: UserJwt;
}

const UserCreated: React.FC<Props> = ({ dataUser }) => {
  const { user_uid } = useRouter().query;
  const { data, isLoading, isError } = useQuery(
    ["systems_by_user_created", user_uid],
    () => getSystemsByUserCreatedSystem(user_uid as string),
    {
      enabled: !!user_uid,
    }
  );

  return (
    <div>
      <Navbar dataUser={dataUser} />
      <div className="bg-gray-100 min-h-screen py-20">
        {isLoading ? <Loader /> : ""}
        {data ? (
          <div>
            {data.data.map((systemAndUser: SystemAndUser) => (
              <SystemCard
                fromUser={dataUser}
                isAdmin={true}
                dataSystem={systemAndUser}
                user={systemAndUser.users}
                key={systemAndUser.id}
              />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default WithAuth(UserCreated);
