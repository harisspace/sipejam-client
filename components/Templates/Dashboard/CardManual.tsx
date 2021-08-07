import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect } from "react";
import { ChangeEvent } from "react";
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";
import { useQuery } from "react-query";
import { getSpecificSystem } from "../../../api/system.request";
import { WebsocketContext } from "../../../contextApi/context/websocket.context";

interface Props {
  title: string;
  icon: "off" | "on";
  meta: "power" | "lamp";
}

const CardManual: React.FC<Props> = ({ title, icon, meta }) => {
  const iconList = {
    off: <HiOutlineStatusOffline className="text-4xl" />,
    on: <HiOutlineStatusOnline className="text-4xl" />,
  };

  const { system_uid } = useRouter().query;
  const { data, isError, isLoading } = useQuery(
    ["system", system_uid],
    async () => getSpecificSystem(system_uid as string),
    {
      enabled: !!system_uid,
    }
  );

  const { ws, setIotToken }: any = useContext(WebsocketContext);

  useEffect(() => {
    if (!data) return;
    setIotToken(data.data.iot_token);
    if (!ws.current) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setIotToken, ws.current]);

  // event
  const handleChangeLamp = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (!ws.current) return;
    console.log(e.target.value);

    ws.current.send(
      JSON.stringify({ event: "web_client", data: { value, meta: "lamp", iot_token: data?.data.iot_token } })
    );
  };

  const handleChangePower = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({ event: "web_client", data: { value, meta: "power", iot_token: data?.data.iot_token } })
    );
  };

  return (
    <div className="shadow-lg w-1/4 p-5 rounded-md cursor-pointer">
      <div className="mb-3">
        <span className="font-bold text-lg">{title}</span>
      </div>
      <div className="flex items-center">
        {Object.entries(iconList).filter(([key, value]) => key === icon)[0][1]}
        <span className="ml-5">
          {meta === "power" ? (
            <select onChange={handleChangePower}>
              <option value="on">ON</option>
              <option value="off">OFF</option>
            </select>
          ) : (
            <select onChange={handleChangeLamp}>
              <option value="red">RED</option>
              <option value="orange">ORANGE</option>
            </select>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardManual;
