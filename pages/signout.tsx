import nookies from "nookies";
import { GetServerSideProps } from "next";
import { signoutRequest } from "../api/user.request";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  nookies.destroy(ctx, "token");

  try {
    await signoutRequest();
  } catch (err) {
    console.log(err);
  }

  return {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };
};

const Signout = () => {
  return null;
};

export default Signout;
