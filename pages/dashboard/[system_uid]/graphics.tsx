import React, { useEffect } from "react";
import NavbarLeft from "../../../components/Templates/NavbarLeft";
import { useState } from "react";
import dynamic from "next/dynamic";
import WithAuth from "../../../components/Auth/WithAuth";
import { UserJwt } from "../../../interface/user.interface";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import {
  getAllSmallVehicle1Data,
  getAllSmallVehicle2Data,
  getAllSpeed1Data,
  getAllSpeed2Data,
  getAllVehicle1Data,
  getAllVehicle2Data,
  getSpecificSystem,
} from "../../../api/system.request";
import {
  SmallVehicle1,
  SmallVehicle2,
  Speed1,
  Speed2,
  Vehicle1,
  Vehicle2,
  WebsocketEvent,
} from "../../../interface/system.interface";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext } from "react";
import { WebsocketContext } from "../../../contextApi/context/websocket.context";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  dataUser: UserJwt;
}

const Graphics: React.FC<Props> = ({ dataUser }) => {
  dayjs.extend(relativeTime);

  const { system_uid } = useRouter().query;

  // query system
  const { data } = useQuery(["system", system_uid], async () => getSpecificSystem(system_uid as string), {
    enabled: !!system_uid,
  });

  // query speed and vehicle
  const { data: speeds1Data, isSuccess: speeds1IsSuccess } = useQuery(
    ["speeds1", system_uid],
    async () => getAllSpeed1Data(system_uid as string),
    { enabled: !!system_uid }
  );
  const { data: speeds2Data, isSuccess: speeds2IsSuccess } = useQuery(
    ["speeds2", system_uid],
    async () => getAllSpeed2Data(system_uid as string),
    { enabled: !!system_uid }
  );
  const { data: vehicles1Data, isSuccess: vehicles1IsSuccess } = useQuery(
    ["vehicles1", system_uid],
    async () => getAllVehicle1Data(system_uid as string),
    { enabled: !!system_uid }
  );
  const { data: vehicles2Data, isSuccess: vehicle2IsSuccess } = useQuery(
    ["vehicles2", system_uid],
    async () => getAllVehicle2Data(system_uid as string),
    { enabled: !!system_uid }
  );
  const { data: smallVehicle1Data, isSuccess: smallVehicle1IsSuccess } = useQuery(
    ["smallvehicles1", system_uid],
    async () => getAllSmallVehicle1Data(system_uid as string),
    { enabled: !!system_uid }
  );

  const { data: smallVehicle2Data, isSuccess: smallVehicle2IsSuccess } = useQuery(
    ["smallvehicles2", system_uid],
    async () => getAllSmallVehicle2Data(system_uid as string),
    { enabled: !!system_uid }
  );

  // state
  const [options, setOptions] = useState<object>({
    chart: {
      id: "area",
    },
  });

  const [seriesSpeed1, setSeriesSpeed1] = useState<any>([
    {
      name: "speeds-1",
      data: [],
      noData: {
        text: "...loading",
      },
    },
  ]);

  useEffect(() => {
    if (speeds1Data && speeds1Data.data.length > 0) {
      setSeriesSpeed1([
        {
          ...seriesSpeed1,
          data: speeds1Data.data
            .map((speed: Speed1) => ({
              x: dayjs().to(dayjs(speed.created_at)),
              y: speed.speed,
            }))
            .reverse(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speeds1IsSuccess]);

  const [seriesSpeed2, setSeriesSpeed2] = useState<any>([
    {
      name: "speeds-2",
      data: [],
      noData: {
        text: "...loading",
      },
    },
  ]);

  useEffect(() => {
    if (speeds2Data && speeds2Data.data.length > 0) {
      setSeriesSpeed2([
        {
          ...seriesSpeed2,
          data: speeds2Data.data
            .map((speed2: Speed2) => ({
              x: dayjs().to(dayjs(speed2.created_at)),
              y: speed2.speed,
            }))
            .reverse(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speeds2IsSuccess]);

  // vehicle1 graph data
  const [seriesVehicle1, setSeriesVehicle1] = useState<any>([
    {
      name: "vehicles-1",
      data: [],
      noData: {
        text: "...loading",
      },
    },
  ]);

  useEffect(() => {
    if (vehicles1Data && vehicles1Data.data.length > 0) {
      setSeriesVehicle1([
        {
          ...seriesVehicle1,
          data: vehicles1Data.data
            .map((vehicle1: Vehicle1) => ({
              x: dayjs().to(dayjs(vehicle1.created_at)),
              y: vehicle1.vehicle,
            }))
            .reverse(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles1IsSuccess]);

  // vehicle2 graph data
  const [seriesVehicle2, setSeriesVehicle2] = useState<any>([
    {
      name: "vehicles-2",
      data: [],
      noData: {
        text: "...loading",
      },
    },
  ]);

  useEffect(() => {
    if (vehicles2Data && vehicles2Data.data.length > 0) {
      setSeriesVehicle2([
        {
          ...seriesVehicle2,
          data: vehicles2Data.data
            .map((vehicle2: Vehicle2) => ({
              x: dayjs().to(dayjs(vehicle2.created_at)),
              y: vehicle2.vehicle,
            }))
            .reverse(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle2IsSuccess]);

  // small vehicle1 graph data
  const [seriesSmallVehicle1, setSeriesSmallVehicle1] = useState<any>([
    {
      name: "small-vehicles-1",
      data: [],
      noData: {
        text: "...loading",
      },
    },
  ]);

  useEffect(() => {
    if (smallVehicle1Data && smallVehicle1Data.data.length > 0) {
      setSeriesSmallVehicle1([
        {
          ...seriesSmallVehicle1,
          data: smallVehicle1Data.data
            .map((smallVehicle1: SmallVehicle1) => ({
              x: dayjs().to(dayjs(smallVehicle1.created_at)),
              y: smallVehicle1.small_vehicle,
            }))
            .reverse(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smallVehicle1IsSuccess]);

  // small vehicle2 graph data
  const [seriesSmallVehicle2, setSeriesSmallVehicle2] = useState<any>([
    {
      name: "small-vehicles-2",
      data: [],
      noData: {
        text: "...loading",
      },
    },
  ]);

  useEffect(() => {
    if (smallVehicle2Data && smallVehicle2Data.data.length > 0) {
      setSeriesSmallVehicle2([
        {
          ...seriesSmallVehicle2,
          data: smallVehicle2Data.data
            .map((smallVehicle2: SmallVehicle2) => ({
              x: dayjs().to(dayjs(smallVehicle2.created_at)),
              y: smallVehicle2.small_vehicle,
            }))
            .reverse(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smallVehicle2IsSuccess]);

  // websocket
  const { ws, setIotToken }: any = useContext(WebsocketContext);

  useEffect(() => {
    if (!data) return;

    setIotToken(data.data.iot_token);

    if (!ws.current) return;

    ws.current.onmessage = (event: any) => {
      const { data, event: type }: WebsocketEvent = JSON.parse(event.data);
      const dateNow = new Date();
      if (type === "speed_1" && speeds1Data) {
        setSeriesSpeed1([
          {
            ...seriesSpeed1,
            data: [...seriesSpeed1[0].data, { x: dayjs().to(dayjs(dateNow)), y: data.speed }],
          },
        ]);
      }
      if (type === "speed_2") {
        setSeriesSpeed2([
          {
            ...seriesSpeed2,
            data: [...seriesSpeed2[0].data, { x: dayjs().to(dayjs(dateNow)), y: data.speed }],
          },
        ]);
      }
      if (type === "vehicle_1") {
        setSeriesVehicle1([
          {
            ...seriesVehicle1,
            data: [...seriesVehicle1[0].data, { x: dayjs().to(dayjs(dateNow)), y: data.vehicle }],
          },
        ]);
      }
      if (type === "vehicle_2") {
        setSeriesVehicle2([
          {
            ...seriesVehicle2,
            data: [...seriesVehicle2[0].data, { x: dayjs().to(dayjs(dateNow)), y: data.vehicle }],
          },
        ]);
      }
      if (type === "small_vehicle_1") {
        setSeriesSmallVehicle1([
          {
            ...seriesSmallVehicle1,
            data: [...seriesSmallVehicle1[0].data, { x: dayjs().to(dayjs(dateNow)), y: data.small_vehicle }],
          },
        ]);
      }
      if (type === "small_vehicle_2") {
        setSeriesSmallVehicle2([
          {
            ...seriesSmallVehicle2,
            data: [...seriesSmallVehicle2[0].data, { x: dayjs().to(dayjs(dateNow)), y: data.small_vehicle }],
          },
        ]);
      }
    };
  }, [
    setIotToken,
    seriesSpeed1,
    speeds1Data,
    data,
    ws,
    seriesSpeed2,
    seriesVehicle1,
    seriesVehicle2,
    seriesSmallVehicle1,
    seriesSmallVehicle2,
  ]);

  return (
    <div className="grid grid-cols-12">
      <NavbarLeft dataUser={dataUser} />

      <div className="col-span-10 bg-gray-100 min-h-screen">
        <div className="w-wrapper m-auto mt-5">
          <div className="p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-center uppercase font-bold text-xl">Truck/Bus Detected</h1>
            <div className="flex justify-between">
              <div>
                <h2 className="text-center">System 1</h2>
                <Chart options={options} series={seriesVehicle1} type="area" width="470" />
              </div>
              <div>
                <h2 className="text-center">System 2</h2>
                <Chart options={options} series={seriesVehicle2} type="area" width="470" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-white p-7 rounded-sm mt-14">
            <div className="grid-cols-1 p-5">
              <h1 className="text-center text-xl font-bold">Data Vehicle From System 1</h1>
              <div className="bg-gray-200 p-7 max-h-64 h-64 overflow-y-scroll">
                {vehicles1IsSuccess
                  ? vehicles1Data?.data.map((vehicle1: Vehicle1) => (
                      <div key={vehicle1.id} className="flex py-1 px-1 border-b border-gray-500 text-sm">
                        <span>
                          {dayjs().to(dayjs(vehicle1.created_at))},{" "}
                          {dayjs(vehicle1.created_at).format("dddd, MMMM DD,YYYY h A")}{" "}
                        </span>
                        <span className="ml-1">| {vehicle1.vehicle} Truk/Bus</span>
                      </div>
                    ))
                  : "failed"}
              </div>
            </div>
            <div className="grid-cols-1 p-5">
              <h1 className="text-center text-xl font-bold">Data Vehicle From System 2</h1>
              <div className="bg-gray-200 p-7 max-h-64 h-64 overflow-y-scroll">
                {vehicle2IsSuccess
                  ? vehicles2Data?.data.map((vehicle2: Vehicle2) => (
                      <div key={vehicle2.id} className="flex py-1 px-1 border-b border-gray-500 text-sm">
                        <span>
                          {dayjs().to(dayjs(vehicle2.created_at))},{" "}
                          {dayjs(vehicle2.created_at).format("dddd, MMMM DD,YYYY h A")}{" "}
                        </span>
                        <span className="ml-1">| {vehicle2.vehicle} Truk/Bus</span>
                      </div>
                    ))
                  : "failed"}
              </div>
            </div>
          </div>

          {/* small vehicle chart */}
          <div className="p-4 bg-white shadow-xl rounded-xl mt-16">
            <h1 className="text-center uppercase font-bold text-xl">Non Truck/Bus Detected</h1>
            <div className="flex justify-between">
              <div>
                <h2 className="text-center">System 1</h2>
                <Chart options={options} series={seriesSmallVehicle1} type="area" width="470" />
              </div>
              <div>
                <h2 className="text-center">System 2</h2>
                <Chart options={options} series={seriesSmallVehicle2} type="area" width="470" />
              </div>
            </div>
          </div>

          {/* table small vehicle */}
          <div className="grid grid-cols-2 bg-white p-7 rounded-sm mt-14">
            <div className="grid-cols-1 p-5">
              <h1 className="text-center text-xl font-bold">Data Non Truck/Bus From System 1</h1>
              <div className="bg-gray-200 max-h-64 h-64 p-7 overflow-y-scroll">
                {smallVehicle1IsSuccess
                  ? smallVehicle1Data?.data.map((smallVehicle1: SmallVehicle1) => (
                      <div key={smallVehicle1.id} className="flex py-1 px-1 border-b border-gray-500 text-sm">
                        <span>
                          {dayjs().to(dayjs(smallVehicle1.created_at))},{" "}
                          {dayjs(smallVehicle1.created_at).format("dddd, MMMM DD,YYYY h A")}{" "}
                        </span>
                        <span className="ml-1">| {smallVehicle1.small_vehicle} Non truck/bus</span>
                      </div>
                    ))
                  : "failed"}
              </div>
            </div>
            <div className="grid-cols-1 p-5">
              <h1 className="text-center text-xl font-bold">Data Non Truck/Bus From System 2</h1>
              <div className="bg-gray-200 p-7 max-h-64 h-64 overflow-y-scroll">
                {smallVehicle2IsSuccess
                  ? smallVehicle2Data?.data.map((smallVehicle2: SmallVehicle2) => (
                      <div key={smallVehicle2.id} className="flex py-1 px-1 border-b border-gray-500 text-sm">
                        <span>
                          {dayjs().to(dayjs(smallVehicle2.created_at))},{" "}
                          {dayjs(smallVehicle2.created_at).format("dddd, MMMM DD,YYYY h A")}{" "}
                        </span>
                        <span className="ml-1">| {smallVehicle2.small_vehicle} Non truck/bus</span>
                      </div>
                    ))
                  : "failed"}
              </div>
            </div>
          </div>

          {/* speed chart */}
          <div className="p-4 bg-white shadow-xl rounded-xl mt-16">
            <h1 className="text-center uppercase font-bold text-xl">Speed</h1>
            <div className="flex justify-between">
              <div>
                <h2 className="text-center">System 1</h2>
                <Chart options={options} series={seriesSpeed1} type="area" width="470" />
              </div>
              <div>
                <h2 className="text-center">System 2</h2>
                <Chart options={options} series={seriesSpeed2} type="area" width="470" />
              </div>
            </div>
          </div>

          {/* data */}
          <div className="grid grid-cols-2 bg-white p-7 rounded-sm mt-14">
            <div className="grid-cols-1 p-5">
              <h1 className="text-center text-xl font-bold">Data Speed From System 1</h1>
              <div className="bg-gray-200 max-h-64 h-64 p-7 overflow-y-scroll">
                {speeds1IsSuccess
                  ? speeds1Data?.data.map((speed1: Speed1) => (
                      <div key={speed1.id} className="flex py-1 px-1 border-b border-gray-500 text-sm">
                        <span>
                          {dayjs().to(dayjs(speed1.created_at))},{" "}
                          {dayjs(speed1.created_at).format("dddd, MMMM DD,YYYY h A")}{" "}
                        </span>
                        <span className="ml-1">| {speed1.speed} Km/h</span>
                      </div>
                    ))
                  : "failed"}
              </div>
            </div>
            <div className="grid-cols-1 p-5">
              <h1 className="text-center text-xl font-bold">Data Speed From System 2</h1>
              <div className="bg-gray-200 p-7 max-h-64 h-64 overflow-y-scroll">
                {speeds2IsSuccess
                  ? speeds2Data?.data.map((speed2: Speed2) => (
                      <div key={speed2.id} className="flex py-1 px-1 border-b border-gray-500 text-sm">
                        <span>
                          {dayjs().to(dayjs(speed2.created_at))},{" "}
                          {dayjs(speed2.created_at).format("dddd, MMMM DD,YYYY h A")}{" "}
                        </span>
                        <span className="ml-1">| {speed2.speed} Km/h</span>
                      </div>
                    ))
                  : "failed"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Graphics);
