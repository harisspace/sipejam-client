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
  return axios.get(`user/checkauth`);
};

export const getSpecificUser = async (user_uid: string) => {
  return axios.get(`user/profile/${user_uid}`);
};

export const getUserNotification = async (user_uid: string) => {
  return axios.get(`user/notification/${user_uid}`);
};

export const updateUserNotificationReadTrue = async (notification_uid: string) => {
  return axios.patch(`user/notification/${notification_uid}?read=true`);
};
