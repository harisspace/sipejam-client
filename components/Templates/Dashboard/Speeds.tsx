import React from "react";
import Card from "../Card";

interface Props {
  speed_1: number;
  speed_2: number;
  vehicle_1: number;
  vehicle_2: number;
  smallVehicle_1: number;
  smallVehicle_2: number;
}

const Speeds: React.FC<Props> = ({
  speed_1 = 0,
  speed_2 = 0,
  vehicle_1,
  vehicle_2,
  smallVehicle_1,
  smallVehicle_2,
}) => {
  return (
    <>
      <h1 className="text-center uppercase text-xl  mb-5">Kecepatan Dan Banyak Kendaraan</h1>
      <div>
        <div className="flex justify-center">
          <Card title="Kecepatan 1" value={speed_1} unit={"Km/Jam"} icon="speed" />
          <Card title="Kecepatan 2" value={speed_2} unit={"Km/Jam"} icon="speed" />
        </div>
        <div className="flex">
          <Card title="Kendaraan Besar 1" value={vehicle_1} unit={"Buah"} icon="truck" />
          <Card title="Kendaraan Besar 2" value={vehicle_2} unit={"Buah"} icon="truck" />
          <Card title="Kendaraan Kecil 1" value={smallVehicle_1} unit={"Buah"} icon="car" />
          <Card title="Kendaraan Kecil 2" value={smallVehicle_2} unit={"Buah"} icon="car" />
        </div>
      </div>
    </>
  );
};

export default Speeds;
