import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { signoutRequest } from "../api/user.request";

const Signout = () => {
  const router = useRouter();
  const { isSuccess } = useQuery("signout", async () => signoutRequest());

  if (isSuccess) router.push("/signin");

  return null;
};

export default Signout;
