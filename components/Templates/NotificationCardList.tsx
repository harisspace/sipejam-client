import { AxiosResponse } from "axios";
import { QueryObserverResult } from "react-query";
import { INotification } from "../../interface/user.interface";
import NotificationCard from "./NotificationCard";

interface Props {
  dataNotifications: INotification[];
  refetch: () => Promise<QueryObserverResult<AxiosResponse<any>, unknown>>;
}

const NotificationCardList: React.FC<Props> = ({ dataNotifications, refetch }) => {
  return (
    <div className="flex justify-center flex-col">
      {dataNotifications.map((notification: INotification) => (
        <NotificationCard dataNotification={notification} refetch={refetch} key={notification.id} />
      ))}
    </div>
  );
};

export default NotificationCardList;
