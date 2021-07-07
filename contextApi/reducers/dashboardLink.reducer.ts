interface Action {
  payload?: any;
  type: any;
}

export const dashboardLinkReducer = (state: any = { link: "dashboard" }, action: Action) => {
  switch (action.type) {
    case "PROFILE":
      return { ...state, link: "profile" };
    case "DASHBOARD":
      return { ...state, link: "dashboard" };
    case "SETTINGS":
      return { ...state, link: "settings" };
    case "GRAPHICS":
      return { ...state, link: "graphics" };
    default:
      return state;
  }
};
