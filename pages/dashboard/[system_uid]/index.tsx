import NavbarLeft from "../../../components/Templates/NavbarLeft";
import WithAuth from "../../../components/Auth/WithAuth";
import { UserJwt } from "../../../interface/user.interface";
import { useRef } from "react";
import Speeds from "../../../components/Templates/Dashboard/Speeds";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getSpecificSystem } from "../../../api/system.request";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { WebsocketContext } from "../../../contextApi/context/websocket.context";

interface Props {
  dataUser: UserJwt;
}

const Dashboard: React.FC<Props> = ({ dataUser }) => {
  const [speed, setSpeed] = useState<any>({ speed_1: 0, speed_2: 0 });
  const [vehicle, setVehicle] = useState<any>({ vehicle_1: 0, vehicle_2: 0 });

  const { ws }: any = useContext(WebsocketContext);

  const router = useRouter();
  const { system_uid } = router.query;
  const { data, isError, isLoading } = useQuery(
    ["system", system_uid],
    async () => getSpecificSystem(system_uid as string),
    {
      enabled: !!system_uid,
    }
  );

  useEffect(() => {
    console.log(ws.current);
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
  }, [ws]);

  return (
    <div className="grid grid-cols-12">
      <NavbarLeft dataUser={dataUser} />
      <div className="col-span-10 bg-gray-100 min-h-screen">
        <div className="w-wrapper m-auto mt-5">
          <Speeds speed={speed} vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Dashboard);
