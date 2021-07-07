import axios from "axios";
import { ISignin, ISignup } from "../interface/user.interface";

export const signupRequest = async ({ email, password, username }: ISignup) => {
  return axios.post("/user/signup", { username, email, password });
};

export const signinRequest = async ({ email, password }: ISignin) => {
  return axios.post("/user/signin", { email, password });
};

export const signoutRequest = async () => {
  return axios.get("/user/signout");
};

export const sendmailRequest = async (token: string) => {
  return axios.get(`/user/sendmail/${token}`);
};

export const checkAuth = async () => {
  return axios.get(`/user/checkauth`);
};
