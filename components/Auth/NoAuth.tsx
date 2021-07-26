/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { checkAuth } from "../../api/user.request";
import Loader from "../Templates/Loader";

const NoAuth = (WrappedComponent: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { isLoading, isSuccess } = useQuery("checkauth", async () => checkAuth());
    const router = useRouter();

    if (isLoading) return <Loader />;
    if (isSuccess) router.back();

    return <WrappedComponent {...props} />;
  };
};

export default NoAuth;
