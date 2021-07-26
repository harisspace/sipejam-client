import queryString from "querystring";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getOAuthData } from "../../../../api/user.request";
import Loader from "../../../../components/Templates/Loader";

const OAuthGoogle = () => {
  const router = useRouter();
  const [codeQueryString, setCodeQueryString] = useState<string>("");
  const { isLoading, isSuccess } = useQuery(
    ["google-oauth", codeQueryString],
    async () => getOAuthData(codeQueryString),
    {
      enabled: !!router?.query.code,
      retry: 1,
    }
  );

  useEffect(() => {
    if (!router.query.code) return;
    const codeQuery = queryString.stringify({ code: router.query.code });
    setCodeQueryString(codeQuery as string);
  }, [router.query]);

  useEffect(() => {
    if (isSuccess) router.push("/");
  }, [isSuccess, router]);

  return <div>{isLoading ? <Loader /> : ""}</div>;
};

export default OAuthGoogle;
