import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { signoutRequest } from "../api/user.request";

const Signout = () => {
  const router = useRouter();

  const { mutate, isSuccess } = useMutation(() => signoutRequest());

  useEffect(() => {
    if (!router.isReady) return;

    // if (isSuccess) router.push('/signin')
  }, [router]);

  useEffect(() => {
    mutate();
  }, []);

  return null;
};

export default Signout;
