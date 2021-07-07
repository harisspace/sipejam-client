import React from "react";
import Card from "../Card";

interface Props {
  speed: { speed_1: number; speed_2: number };
  vehicle: { vehicle_1: number; vehicle_2: number };
}

const Speeds: React.FC<Props> = ({ speed: { speed_1 = 0, speed_2 = 0 }, vehicle: { vehicle_1, vehicle_2 } }) => {
  return (
    <>
      <h1 className="text-center uppercase text-xl  mb-5">Kecepatan Dan Banyak Kendaraan Besar Yang Lalu</h1>
      <div className="flex">
        <Card title="Kecepatan 1" value={speed_1} unit={"Km/Jam"} />
        <Card title="Kecepatan 2" value={speed_2} unit={"Km/Jam"} />
        <Card title="Kendaraan Besar 1" value={vehicle_1} unit={"Buah"} />
        <Card title="Kecepatan Besar 2" value={vehicle_2} unit={"Buah"} />
      </div>
    </>
  );
};

export default Speeds;
