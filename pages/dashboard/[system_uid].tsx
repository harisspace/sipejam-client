import Loader from "../../components/Templates/Loader";
import NavbarLeft from "../../components/Templates/NavbarLeft";
import WithAuth from "../../components/Auth/WithAuth";
import { User } from "../../interface/user.interface";
import { useContext, useReducer, useRef } from "react";
import { DashboardLinkContext } from "../../contextApi/context/dashboardLink.context";
import Speeds from "../../components/Templates/Dashboard/Speeds";
import Graphics from "../../components/Templates/Dashboard/Graphics";
import Settings from "../../components/Templates/Dashboard/Settings";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getSpecificSystem } from "../../api/system.request";
import ProfileSystem from "../../components/Templates/Dashboard/ProfileSystem";
import { useEffect } from "react";
import { WebsocketContext } from "../../contextApi/context/websocket.context";
import { WebsocketActionTypes } from "../../contextApi/actionTypes/websocket.action.types";
import { useState } from "react";

interface Props {
  dataUser: User;
}

const Dashboard: React.FC<Props> = ({ dataUser }) => {
  const [speed, setSpeed] = useState<any>({ speed_1: 0, speed_2: 0 });
  const [vehicle, setVehicle] = useState<any>({ vehicle_1: 0, vehicle_2: 0 });

  const ws = useRef<any>(null);

  const router = useRouter();
  const { system_uid } = router.query;
  const { dashboardLink } = useContext(DashboardLinkContext);
  const { data, isError, isLoading } = useQuery(
    ["system", system_uid],
    async () => getSpecificSystem(system_uid as string),
    {
      enabled: !!system_uid,
    }
  );

  useEffect(() => {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL!);
    ws.current.onopen = () => {
      console.log("websocket open");
      ws.current.send(JSON.stringify({ event: "speed", data: { speed_1: 20, speed_2: 45 } }));
      ws.current.send(JSON.stringify({ event: "vehicle", data: { vehicle_1: 2, vehicle_2: 4 } }));
    };
    ws.current.onmessage = (event: any) => {
      const { data, event: type } = JSON.parse(event.data);
      console.log(data, type);
      if (type === "speed") setSpeed({ speed_1: data.speed_1, speed_2: data.speed_2 });
      if (type === "vehicle") setVehicle({ vehicle_1: data.vehicle_1, vehicle_2: data.vehicle_2 });
    };

    // () =>
    //   (ws.current.onclose = () => {
    //     console.log("websocket closed");
    //   });
  }, []);

  return (
    <div className="grid grid-cols-12">
      <>
        <NavbarLeft dataUser={dataUser} />
        <div className="col-span-10 bg-gray-100 min-h-screen">
          <div className="w-wrapper m-auto mt-5">
            {dashboardLink.link === "dashboard" ? <Speeds speed={speed} vehicle={vehicle} /> : ""}
            {dashboardLink.link === "graphics" ? <Graphics /> : ""}
            {dashboardLink.link === "profile" ? data ? <ProfileSystem /> : <Loader /> : ""}
            {dashboardLink.link === "settings" ? <Settings /> : ""}
          </div>
        </div>
      </>
    </div>
  );
};

export default WithAuth(Dashboard);
