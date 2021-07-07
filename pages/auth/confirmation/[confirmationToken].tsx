import { GetServerSideProps } from "next";
import Router from "next/router";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { confirmationToken } = Router.query;
  let res = null;
  try {
    res = axios.get(`/user/confirmation/${confirmationToken}`);
  } catch (err) {
    return {
      props: {},
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

const Confirmation: React.FC = () => {
  return (
    <div>
      <h1>confirmation failed please try again</h1>
    </div>
  );
};

export default Confirmation;