import { HiOutlineStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";

interface Props {
  title: string;
  icon: "off" | "on";
}

const CardManual: React.FC<Props> = ({ title, icon }) => {
  const iconList = {
    off: <HiOutlineStatusOffline className="text-4xl" />,
    on: <HiOutlineStatusOnline className="text-4xl" />,
  };

  return (
    <div className="shadow-lg w-1/4 p-5 rounded-md cursor-pointer">
      <div className="mb-3">
        <span className="font-bold text-lg">{title}</span>
      </div>
      <div className="flex items-center">
        {Object.entries(iconList).filter(([key, value]) => key === icon)[0][1]}
        <span className="ml-5">mati</span>
      </div>
    </div>
  );
};

export default CardManual;
