import queryString from "querystring";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getOAuthData } from "../../../../api/user.request";
import Loader from "../../../../components/Templates/Loader";
import { setCookie } from "nookies";

const OAuthGoogle = () => {
  const router = useRouter();
  const [codeQueryString, setCodeQueryString] = useState<string>("");
  const { isLoading, isSuccess, data } = useQuery(
    ["google-oauth", codeQueryString],
    async () => getOAuthData(codeQueryString),
    {
      enabled: !!router?.query.code,
    }
  );

  useEffect(() => {
    if (!router.query.code) return;
    const codeQuery = queryString.stringify({ code: router.query.code });
    setCodeQueryString(codeQuery as string);
  }, [router.query]);

  useEffect(() => {
    if (isSuccess && data) {
      setCookie(null, "token", data.data.token, {
        maxAge: 6048000000,
        sameSite: "none",
        path: "/",
        httpOnly: false,
        secure: true,
      });
    }
    router.push("/");
  }, [isSuccess, router, data]);

  return <div>{isLoading ? <Loader /> : ""}</div>;
};

export default OAuthGoogle;
