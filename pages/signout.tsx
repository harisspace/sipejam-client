import nookies from "nookies";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  nookies.destroy(ctx, "token");

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
