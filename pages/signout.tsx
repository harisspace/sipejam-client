import nookies from "nookies";
import { GetServerSideProps } from "next";
import { signoutRequest } from "../api/user.request";
import { useMutation } from "react-query";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  nookies.destroy(ctx, "token");

  return {
    props: {},
  };
};

const Signout = () => {
  const router = useRouter();
  const { mutate, isSuccess } = useMutation(() => signoutRequest());

  useEffect(() => {
    if (!router.isReady) return;
    mutate();
    if (isSuccess) router.push("/");
  }, [router, isSuccess, mutate]);

  return null;
};

export default Signout;
