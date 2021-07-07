/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useQuery } from "react-query";
import { checkAuth } from "../../api/user.request";
import Loader from "../Templates/Loader";
import { useRouter } from "next/router";

// eslint-disable-next-line react/display-name
const WithAuth = (WrappedComponent: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { data, isError, isLoading } = useQuery("checkauth", checkAuth);
    const router = useRouter();
    if (isLoading) return <Loader />;
    if (isError) {
      router.push("/signin");
      return null;
    }

    return <WrappedComponent {...props} dataUser={data?.data} />;
  };
};

export default WithAuth;
