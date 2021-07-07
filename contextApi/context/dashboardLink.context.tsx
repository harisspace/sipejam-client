import { useReducer } from "react";
import { createContext } from "react";
import { dashboardLinkReducer } from "../reducers/dashboardLink.reducer";

export const DashboardLinkContext = createContext({
  dashboardLink: { link: "" },
  dispatchDashboardLink: (data: { type: string; payload?: string }) => {},
});

const initialState = { link: "dashboard" };

interface Props {}

const DashboardLinkContextProvider: React.FC<Props> = ({ children }) => {
  const [dashboardLink, dispatchDashboardLink] = useReducer(dashboardLinkReducer, initialState);

  return (
    <DashboardLinkContext.Provider value={{ dashboardLink, dispatchDashboardLink }}>
      {children}
    </DashboardLinkContext.Provider>
  );
};

export default DashboardLinkContextProvider;
