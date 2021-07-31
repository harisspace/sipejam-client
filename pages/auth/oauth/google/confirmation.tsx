import queryString from "querystring";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getOAuthData } from "../../../../api/user.request";
import Loader from "../../../../components/Templates/Loader";
import { setCookie } from "nookies";

const OAuthGoogle = () => {
  const router = useRouter();
  const [codeQueryString, setCodeQueryString] = useState<string | null>(null);
  const { isLoading, isSuccess, data, error, isError } = useQuery(
    ["google-oauth", codeQueryString],
    async () => getOAuthData(codeQueryString!),
    {
      enabled: !!codeQueryString,
      retry: false,
    }
  );

  useEffect(() => {
    if (!router.query.code) return;
    const codeQuery = queryString.stringify({ code: router.query.code });
    setCodeQueryString(codeQuery as string);
  }, [router.query]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }

    if (isError) {
      console.log((error as any).response);
    }
  }, [isSuccess, router, data, isError, error]);

  return <div>{isLoading ? <Loader /> : ""}</div>;
};

export default OAuthGoogle;
