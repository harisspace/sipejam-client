import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Templates/Layout";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import DashboardLinkContextProvider from "../contextApi/context/dashboardLink.context";
import WebsocketContextProvider from "../contextApi/context/websocket.context";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <WebsocketContextProvider>
      <DashboardLinkContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </DashboardLinkContextProvider>
    </WebsocketContextProvider>
  );
}
export default MyApp;
