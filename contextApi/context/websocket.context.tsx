import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { createContext } from "react";
import { Action } from "react-query/types/core/query";
import { websocketReducer } from "../reducers/websocket.reducer";

export const WebsocketContext = createContext({
  ws: {},
  setIotToken: (iot_token: string) => {},
});

interface Props {}

const WebsocketContextProvider: React.FC<Props> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null);
  const [iot_token, setIotToken] = useState<string | null>(null);

  useEffect(() => {
    if (!iot_token) return;

    ws.current = new WebSocket(process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL!);
    ws.current.onopen = () => {
      console.log(iot_token);
      ws.current!.send(JSON.stringify({ event: "web_client", data: { iot_token, meta: "join" } }));
    };
    ws.current.onclose = () => {
      console.log("close");
    };

    if (!ws.current) return;
    return () => {
      ws.current!.close();
    };
  }, [iot_token, ws]);

  return <WebsocketContext.Provider value={{ ws, setIotToken }}>{children}</WebsocketContext.Provider>;
};

export default WebsocketContextProvider;
