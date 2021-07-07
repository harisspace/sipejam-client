import { Action } from "../../interface/reducer.interface";
import { WebsocketActionTypes } from "../actionTypes/websocket.action.types";

export const websocketReducer = (state: any, action: Action) => {
  switch (state.type) {
    case WebsocketActionTypes.ON_OPEN:
      return {
        ...state,
        ws: (state.ws.onopen = () => {
          console.log("websocket open");
        }),
      };

    default:
      return state;
  }
};
