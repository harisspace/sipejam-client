/* eslint-disable @next/next/no-img-element */
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
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

interface Props {
  dataUser: UserJwt;
}

const Home: React.FC<Props> = ({ dataUser }) => {
  const user_uid = dataUser ? dataUser.user_uid : null;

  // install Swiper modules
  SwiperCore.use([Autoplay, Pagination, Navigation]);

  const {
    data: dataSystems,
    isLoading,
    isSuccess,
  } = useQuery(["system_by_user", user_uid], async () => getSystemsByUserAdmin(user_uid as string), {
    enabled: !!user_uid,
  });

  // list image
  const listImage = [
    {
      name: "Fadhil Elrizanda",
      department: "Ketua Tim",
      img: "fadhil",
    },
    {
      name: "Haris Akbar",
      department: "Anggota Tim",
      img: "haris",
    },
    {
      name: "Dahlia Limarnis",
      department: "Anggota Tim",
      img: "lia",
    },
    {
      name: "Muhammad Wafa Shadiq",
      department: "Anggota Tim",
      img: "wafa",
    },
    {
      name: "Firgi Andira",
      department: "Anggota Tim",
      img: "firgi",
    },
    {
      name: "DR.Eng.Rahmadi Kurnia",
      department: "Dosen Pembimbing",
      img: "pak-rahmadi",
    },
  ];

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
              <h1 className="text-center text-2xl lg:text-6xl font-bold tracking-tighter mb-2 font-roboto">
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

          {/* about */}
          <h3 className="text-center text-3xl sm:text-4xl mb-5 mt-48 font-bold">
            <a target="about">About</a>
          </h3>
          <div className="flex justify-evenly mt-20 sm:mt-32 w-2/4 m-auto">
            <Image src="/images/tut-wuri-handayani.png" width={100} height={100} alt="Logo Tut Wuri Handayani" />
            <Image src="/images/unand.png" width={100} height={100} alt="Logo Unand" />
          </div>
          <div className="flex flex-col items-center mt-20 sm:mt-32 sm:w-3/4 m-auto">
            <q className="text-xl sm:text-3xl font-bold text-center">
              SISTEM PENGATUR KENDARAAN BERBASIS COMPUTER VISION DAN IOT SEBAGAI SOLUSI KEAMANAN PADA TIKUNGAN
              TAJAM
            </q>
            <span className="text-lg sm:text-2xl text-center font-semibold text-primary mt-5">
              Program Kreativitas Mahasiswa Karsa Cipta (PKM-KC) 2021
            </span>
          </div>
          {/* about system */}
          <div className="mt-20 sm:mt-32 sm:w-3/4 m-auto shadow-lg rounded-lg p-6">
            <h3 className="text-center text-2xl font-bold text-green-400">Apa Itu Sistem Sipejam?</h3>
            <p className="mt-10">
              Sipejam merupakan singkatan dari Sistem Pintar Pengatur Jalan. Sistem ini bertugas untuk mengatur
              jalan di wilayah tikungan tajam, dan diletakkan di dua sisi jalan yang berlawanan. Sistem akan
              mendeteksi objek kendaraan, dan mengaturnya sesuai kondisi. Jika terdeteksi kendaraan besar maka di
              sisi lain akan berwarna lampu merah dan palang akan tertutup, sehingga kendaraan besar tersebut aman
              saat melewati tikungan tajam tersebut.
            </p>
          </div>
          {/* about us */}
          <div className="mt-20 sm:mt-32 sm:w-3/4 m-auto shadow-lg rounded-lg p-6">
            <h3 className="text-center text-2xl font-bold text-green-400">Siapa Kami?</h3>
            <p className="mt-10">
              Kami merupakan tim peneliti dari Universitas Andalas. Tim ini terdiri dari 5 mahasiswa dan 1 dosen
              pembimbing. Penelitian dan pembuatan alat mengenai pengatur kendaraan berbasis komputer vision dan
              IoT sebagai solusi keamanan pada tikungan tajam diajukan oleh tim pada Program Kreativitas Mahasiswa
              bidang Karsa Cipta (PKM-KC) 2021.
            </p>
          </div>

          {/* slider */}
          <div className="mt-20 sm:mt-32 sm:w-2/4 m-auto">
            <Swiper
              spaceBetween={30}
              navigation={true}
              centeredSlides={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="m-auto"
            >
              {listImage.map((value) => (
                <SwiperSlide key={value.name}>
                  <div className="flex flex-col justify-center items-center pb-7">
                    <div>
                      <Image
                        className="shadow-lg rounded-full max-w-full h-full w-full align-middle border-none"
                        width={200}
                        height={200}
                        src={`/images/${value.img}.png`}
                        alt="Fadhil Photo"
                      />
                    </div>
                    <span className="sm:text-xl font-bold">{value.name}</span>
                    <span>{value.department}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default WithAuthChangeView(Home);
