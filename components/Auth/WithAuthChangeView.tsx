/* eslint-disable react/display-name */
import { useQuery } from "react-query";
import { checkAuth } from "../../api/user.request";
import Loader from "../Templates/Loader";

const WithAuthChangeView = (WrappedComponent: any) => {
  return (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isLoading } = useQuery("checkauth", checkAuth, { retry: 1, refetchOnWindowFocus: false });
    if (isLoading) return <Loader />;

    return <WrappedComponent {...props} dataUser={data ? data?.data : null} />;
  };
};
export default WithAuthChangeView;
