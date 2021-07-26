import { useRouter } from "next/router";
import { useEffect } from "react";

const Signout = () => {
  const router = useRouter();

  const signoutFetch = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user/signout`, { credentials: "include", method: "GET" });
  };

  useEffect(() => {
    if (!router.isReady) return;

    try {
      signoutFetch();
    } catch (err) {
      console.log(err);
      router.back();
    }
  }, [router]);

  return null;
};

export default Signout;
