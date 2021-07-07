import { GetServerSideProps } from "next";
import nookies from "nookies";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  nookies.destroy(ctx, "token");
  nookies.destroy(ctx, "oauth_token");
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
