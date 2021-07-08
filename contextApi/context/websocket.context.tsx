import { useReducer } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { createContext } from "react";
import { Action } from "react-query/types/core/query";
import { websocketReducer } from "../reducers/websocket.reducer";

export const WebsocketContext = createContext<any>({
  ws: {},
});

const initialState = {
  ws: "",
};

interface Props {}

const WebscoketContextProvider: React.FC<Props> = ({ children }) => {
  const ws = useRef<any>(null);
  // const [ws, dispatchWs] = useReducer(websocketReducer, initialState);

  useEffect(() => {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL!);
  }, []);

  return <WebsocketContext.Provider value={{ ws }}>{children}</WebsocketContext.Provider>;
};

export default WebscoketContextProvider;
