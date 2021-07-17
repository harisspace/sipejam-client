import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Templates/Layout";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import WebsocketContextProvider from "../contextApi/context/websocket.context";
import ModalContextProvider from "../contextApi/context/modal.context";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <WebsocketContextProvider>
      <ModalContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ModalContextProvider>
    </WebsocketContextProvider>
  );
}
export default MyApp;
