import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };
};

const SendMailIndex = () => {
  return null;
};

export default SendMailIndex;
