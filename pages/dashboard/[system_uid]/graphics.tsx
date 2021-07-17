import React from "react";
import NavbarLeft from "../../../components/Templates/NavbarLeft";
import { useState } from "react";
import dynamic from "next/dynamic";
import WithAuth from "../../../components/Auth/WithAuth";
import { UserJwt } from "../../../interface/user.interface";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  dataUser: UserJwt;
}

const Graphics: React.FC<Props> = ({ dataUser }) => {
  // state
  const [options, setOptions] = useState<object>({
    chart: {
      id: "basic-area",
    },
    xaxis: {
      categories: ["20.21", "20.22", "20.23", "20.24", "20.25", "20.26", "20.27", "20.28", "20.29"],
    },
  });

  const [series, setSeries] = useState<any>([
    {
      name: "series-1",
      data: [3, 4, 1, 5, 3, 6, 7, 1],
    },
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
                <Chart options={options} series={series} type="area" width="470" />
              </div>
              <div>
                <h2 className="text-center">System 2</h2>
                <Chart options={options} series={series} type="area" width="470" />
              </div>
            </div>
          </div>
          <div className="flex-col flex bg-white p-7 rounded-sm mt-14 max-h-64 h-64">
            <h1 className="text-center text-xl font-bold">Data Object Detected</h1>
            <div className="bg-gray-200 p-7 overflow-y-scroll">
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
            </div>
          </div>

          {/* speed chart */}
          <div className="p-4 bg-white shadow-xl rounded-xl mt-16">
            <h1 className="text-center uppercase font-bold text-xl">Speed</h1>
            <div className="flex justify-between">
              <div>
                <h2 className="text-center">System 1</h2>
                <Chart options={options} series={series} type="area" width="470" />
              </div>
              <div>
                <h2 className="text-center">System 2</h2>
                <Chart options={options} series={series} type="area" width="470" />
              </div>
            </div>
          </div>

          {/* data */}
          <div className="flex-col flex bg-white p-7 rounded-sm mt-14 max-h-64 h-64">
            <h1 className="text-center text-xl font-bold">Data Object Detected</h1>
            <div className="bg-gray-200 p-7 overflow-y-scroll">
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
              <div className="flex py-1 px-1 border-b border-gray-500">
                <span>Jan/03/2021 9 AM</span>
                <span>System 1 = 2 Bus</span>
                <span>System 2 = 1 Truck</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Graphics);
