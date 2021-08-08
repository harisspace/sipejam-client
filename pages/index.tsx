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

  const {
    data: dataSystems,
    isLoading,
    isSuccess,
  } = useQuery(["system_by_user", user_uid], async () => getSystemsByUserAdmin(user_uid as string), {
    enabled: !!user_uid,
  });

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
            {isLoading ? (
              <Loader />
            ) : dataSystems && dataSystems.data.length > 0 && isSuccess ? (
              <div className="mt-20">
                <SystemCardList dataUser={dataUser} dataSystems={dataSystems.data} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image
                  layout="responsive"
                  width={100}
                  height={100}
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
              <h1 className="text-center text-2xl lg:text-6xl font-bold tracking-tighter mb-2">
                Sistem Pintar Pengatur Jalan
              </h1>
              <h1 className="text-center text-xl lg:text-3xl font-medium text-secondary">
                Berbasis Computer Vision dan IoT
              </h1>
              <div className="items-center bg-all-system bg-cover h-52 w-full sm:h-96 mt-10 sm:w-7/12 m-auto"></div>
            </div>

            <div>
              <h2 className="text-center text-xl sm:text-4xl mb-5 mt-48 font-semibold">Our Services</h2>
              <div className="flex justify-center flex-col items-center mt-10">
                <div className="w-20 sm:w-32 h-20 sm:h-32">
                  <Image
                    src="/images/realtime-monitoring.png"
                    width={100}
                    height={100}
                    alt="realtime"
                    layout="responsive"
                  />
                </div>
                <span className="block text-primary">Realtime Monitoring</span>
              </div>

              <div className="w-8/12 m-auto">
                <div className="flex flex-col sm:flex-row justify-between mt-20">
                  <div className="flex justify-center flex-col items-center">
                    <Image src="/images/kecepatan.png" width={130} height={100} className="block" alt="speed" />
                    <span className="text-primary">Speed Detection</span>
                  </div>

                  <div className="flex justify-center flex-col items-center mt-20 sm:mt-0">
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
