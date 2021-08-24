import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getSpecificUser } from "../../api/user.request";
import WithAuth from "../../components/Auth/WithAuth";
import Loader from "../../components/Templates/Loader";
import Navbar from "../../components/Templates/Navbar";
import { UserJwt } from "../../interface/user.interface";
import Image from "next/image";
import { getSystemsByUserCreatedSystem, getSystemsByUserAdmin } from "../../api/system.request";
import ReactTooltip from "react-tooltip";

interface Props {
  dataUser: UserJwt;
}

const GetSpecificUser: React.FC<Props> = ({ dataUser }) => {
  const router = useRouter();
  const { user_uid } = router.query;

  const { isError, isLoading, data } = useQuery(["user", user_uid], () => getSpecificUser(user_uid as string), {
    enabled: !!user_uid,
  });

  const {
    data: dataSystem,
    isLoading: isLoadingSystem,
    isError: isErrorSystem,
  } = useQuery(["systems", user_uid], () => getSystemsByUserAdmin(user_uid as string), { enabled: !!user_uid });

  const {
    isError: isErrorSystemByUserCreated,
    data: dataSystemByUserCreated,
    isLoading: isLoadingSystemByUserCreated,
  } = useQuery(["systems_by_user_created", user_uid], () => getSystemsByUserCreatedSystem(user_uid as string), {
    enabled: !!user_uid,
  });

  return (
    <>
      <div className="min-h-screen">
        <Navbar dataUser={dataUser} />
        <div className="m-auto py-10 bg-gray-100 min-h-screen">
          {isLoading && !data ? (
            <Loader />
          ) : (
            <div className="sm:w-1/2 p-4 m-auto rounded-lg shadow-xl bg-secondary">
              <div className="flex-col flex">
                <h1 className="text-2xl">{data?.data.username}</h1>
                <span className="text-xs text-red-500">{data?.data.user_role}</span>
                <div className="flex justify-center mt-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${data?.data.image_uri}`}
                    alt={data?.data.image_uri}
                    width={250}
                    height={210}
                  />
                </div>
                {/* bottom */}
                <div>
                  <h3>Admin Of</h3>
                  {
                    <>
                      {isLoadingSystem ? <Loader /> : ""}
                      {isErrorSystem ? <h1>You are not admin yet</h1> : ""}
                      {dataSystem ? (
                        <div>
                          <div className="flex">
                            {(dataSystem as any).data.map(({ systems }: any) => (
                              <div key={systems.id} data-tip={systems.name}>
                                <Image
                                  className="rounded-full cursor-pointer bg-white max-w-full h-full w-full align-middle border-none shadow"
                                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${systems.image_uri}`}
                                  alt={systems.name}
                                  width={40}
                                  height={40}
                                />
                                <ReactTooltip />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  }
                </div>
                <div>
                  <h3>System Created</h3>
                  {
                    <>
                      {isErrorSystemByUserCreated ? <h1>Something went wrong</h1> : ""}
                      {dataSystemByUserCreated?.data.length < 1 && dataSystemByUserCreated ? (
                        <h1>Lets create system</h1>
                      ) : (
                        ""
                      )}
                      {dataSystemByUserCreated ? (
                        <div>
                          <div className="flex">
                            {(dataSystemByUserCreated as any).data.map((system: any) => (
                              <div key={system.id} data-tip={system.name}>
                                <Image
                                  className="rounded-full cursor-pointer bg-white max-w-full h-full w-full align-middle border-none shadow"
                                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${system.image_uri}`}
                                  alt={system.name}
                                  width={40}
                                  height={40}
                                />
                                <ReactTooltip />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Loader />
                      )}
                    </>
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WithAuth(GetSpecificUser);
