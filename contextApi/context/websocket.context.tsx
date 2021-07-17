import { useReducer } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { createContext } from "react";
import { Action } from "react-query/types/core/query";
import { websocketReducer } from "../reducers/websocket.reducer";

export const WebsocketContext = createContext({
  ws: {},
});

interface Props {}

const WebsocketContextProvider: React.FC<Props> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL!);
    ws.current.onopen = () => {
      console.log(`websocket connect to ${process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL}`);
    };
  }, []);

  return <WebsocketContext.Provider value={{ ws }}>{children}</WebsocketContext.Provider>;
};

export default WebsocketContextProvider;
