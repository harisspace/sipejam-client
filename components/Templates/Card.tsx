import { IoSpeedometerOutline } from "react-icons/io5";
import { RiTruckLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";

interface Props {
  title: string;
  value: number;
  unit: string;
  icon: "truck" | "car" | "speed";
}

const Card: React.FC<Props> = ({ title, value, unit, icon }) => {
  const iconList = {
    speed: <IoSpeedometerOutline className="text-4xl" />,
    truck: <RiTruckLine className="text-4xl" />,
    car: <AiOutlineCar className="text-4xl" />,
  };

  return (
    <div className="shadow-lg w-1/4 p-5 rounded-md cursor-pointer">
      <div className="mb-3">
        <span className="font-bold text-lg">{title}</span>
      </div>
      <div className="flex items-center">
        {Object.entries(iconList).filter(([key, value]) => key == icon)[0][1]}
        <span className="ml-5">
          {value} {unit}
        </span>
      </div>
    </div>
  );
};

export default Card;
