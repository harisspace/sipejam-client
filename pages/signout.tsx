import { useRouter } from "next/router";
import { useEffect } from "react";
import { signoutRequest } from "../api/user.request";

const Signout = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    try {
      signoutRequest();
    } catch (err) {
      console.log(err);
      router.back();
    }
  }, [router]);

  return null;
};

export default Signout;
