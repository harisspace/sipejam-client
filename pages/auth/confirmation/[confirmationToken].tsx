import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { confirmationToken }: any = ctx.params;
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
