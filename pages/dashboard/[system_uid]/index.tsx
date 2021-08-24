import NavbarLeft from "../../../components/Templates/NavbarLeft";
import WithAuth from "../../../components/Auth/WithAuth";
import { UserJwt } from "../../../interface/user.interface";
import Speeds from "../../../components/Templates/Dashboard/Speeds";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getSpecificSystem } from "../../../api/system.request";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { WebsocketContext } from "../../../contextApi/context/websocket.context";
import { WebsocketEvent } from "../../../interface/system.interface";
import CardManual from "../../../components/Templates/Dashboard/CardManual";

interface Props {
  dataUser: UserJwt;
}

const Dashboard: React.FC<Props> = ({ dataUser }) => {
  const [systemWork, setSystemWork] = useState<string>("");
  const [speed1, setSpeed1] = useState<number>(0);
  const [speed2, setSpeed2] = useState<number>(0);
  const [vehicle1, setVehicle1] = useState<number>(0);
  const [vehicle2, setVehicle2] = useState<number>(0);
  const [smallVehicle1, setSmallVehicle1] = useState<number>(0);
  const [smallVehicle2, setSmallVehicle2] = useState<number>(0);

  const { ws, setIotToken }: any = useContext(WebsocketContext);

  const { system_uid } = useRouter().query;
  const { data, isError, isLoading } = useQuery(
    ["system", system_uid],
    async () => getSpecificSystem(system_uid as string),
    {
      enabled: !!system_uid,
    }
  );

  // when component did mount get localstorage system-work
  useEffect(() => {
    let systemWorkFromLocal = localStorage.getItem("system-work") || "auto";
    console.log(systemWorkFromLocal);
    setSystemWork(systemWorkFromLocal);
  }, []);

  useEffect(() => {
    if (!data) return;

    setIotToken(data.data.iot_token);

    if (!ws.current) return;

    ws.current.onmessage = (event: any) => {
      console.log("ada message");
      const { data, event: type }: WebsocketEvent = JSON.parse(event.data);
      if (type === "speed_1") setSpeed1(data.speed!);
      if (type === "speed_2") setSpeed2(data.speed!);
      if (type === "vehicle_1") setVehicle1(data.vehicle!);
      if (type === "vehicle_2") setVehicle2(data.vehicle!);
      if (type === "small_vehicle_1") setSmallVehicle1(data.small_vehicle!);
      if (type === "small_vehicle_2") setSmallVehicle2(data.small_vehicle!);
    };
    ws.current.onclose = () => {
      console.log("close");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.current, setIotToken, data]);

  return (
    <div className="grid grid-cols-12">
      <NavbarLeft dataUser={dataUser} />
      <div className="col-span-10 bg-gray-100 min-h-screen">
        <div className="w-wrapper m-auto mt-5">
          {systemWork === "automatic" ? (
            <Speeds
              speed_1={speed1}
              speed_2={speed2}
              vehicle_1={vehicle1}
              vehicle_2={vehicle2}
              smallVehicle_1={smallVehicle1}
              smallVehicle_2={smallVehicle2}
            />
          ) : (
            <>
              <h1 className="text-center uppercase text-xl mb-5">Manual</h1>
              <div className="flex justify-center">
                <CardManual meta="power" title="On/Off System 1" icon="on" />
                <CardManual meta="power" title="On/Off System 2" icon="on" />
              </div>
              <div className="flex justify-between">
                <CardManual meta="lamp" title="Warna Rambu Peringatan System 2" icon="on" />
                <CardManual meta="lamp" title="Warna Rambu Peringatan System 1" icon="on" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Dashboard);
