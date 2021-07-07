import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { sendmailRequest } from "../../../api/user.request";
import Loader from "../../../components/Templates/Loader";

const SendMail: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const { data, isError, isLoading, error } = useQuery(
    ["sendmail", token],
    async () => await sendmailRequest(token as string),
    {
      enabled: !!token,
    }
  );

  if (!token || isError) {
    router.push("/signin");
  }
  if (isError) console.log((error as any)?.response);
  if (data) router.push("/signin");

  return <div>{isLoading ? <Loader /> : ""}</div>;
};

export default SendMail;
