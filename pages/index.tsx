import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Templates/Navbar";
import Footer from "../components/Templates/Footer";
import { useQuery } from "react-query";
import { getSystemsByUserAdmin } from "../api/system.request";
import SystemCardList from "../components/Templates/SystemCardList";
import Loader from "../components/Templates/Loader";
import { UserJwt } from "../interface/user.interface";
import WithAuthChangeView from "../components/Auth/WithAuthChangeView";

interface Props {
  dataUser: UserJwt;
}

const Home: React.FC<Props> = ({ dataUser }) => {
  const user_uid = dataUser ? dataUser.user_uid : null;

  const { data: dataSystems, isLoading } = useQuery(
    ["system_by_user", user_uid],
    async () => getSystemsByUserAdmin(user_uid as string),
    { enabled: !!user_uid }
  );

  return (
    <>
      {dataUser ? (
        // user login
        <div>
          <Head>
            <title>Home</title>
          </Head>
          <div className="bg-gradient-to-b from-primary via-secondary">
            <Navbar dataUser={dataUser} />
            {isLoading ? <Loader /> : ""}
            {dataSystems?.data && dataSystems.data.length > 0 ? (
              <div className="mt-20">
                <SystemCardList dataUser={dataUser} dataSystems={dataSystems.data} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image
                  className="object-contain"
                  height={500}
                  width={500}
                  src="/images/empty.png"
                  alt="You already admin all System"
                />
                <span>You are not be admin yet</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        // user not login
        <div>
          <Head>
            <title>Home</title>
          </Head>
          <div className="bg-gradient-to-b from-primary via-secondary">
            <Navbar />
            <div className="mt-20">
              <h1 className="text-center text-6xl font-bold tracking-tighter mb-2">
                Sistem Pintar Pengatur Jalan
              </h1>
              <h1 className="text-center text-3xl font-medium text-secondary">Berbasis Computer Vision dan IoT</h1>
              <div className="items-center bg-all-system bg-cover h-96 w-7/12 m-auto"></div>
            </div>

            <div>
              <h2 className="text-center text-4xl mb-5 mt-48 font-semibold">Our Services</h2>
              <div className="flex justify-center flex-col items-center">
                <Image
                  src="/images/realtime-monitoring.png"
                  width={100}
                  height={100}
                  alt="realtime"
                  layout="fixed"
                />
                <span className="block text-primary">Realtime Monitoring</span>
              </div>

              <div className="w-8/12 m-auto">
                <div className="flex flex-row justify-between mt-20">
                  <div className="flex justify-center flex-col items-center">
                    <Image src="/images/kecepatan.png" width={130} height={100} className="block" alt="speed" />
                    <span className="text-primary">Speed Detection</span>
                  </div>

                  <div className="flex justify-center flex-col items-center">
                    <Image src="/images/safety.png" width={120} height={100} className="block" alt="safety" />
                    <span className="text-primary">Safety</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default WithAuthChangeView(Home);
