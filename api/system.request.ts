import axios from "axios";
import { AddAdminDto, CreateSystemDto, RequestToBeAdminDto } from "../interface/system.interface";

export const createSystemRequest = async (data: CreateSystemDto) => {
  return await axios.post("/system/create", data);
};

export const getSystemsRequest = async () => {
  return await axios.get("/system");
};

export const getSystemsByUserAdmin = async (user_uid: string) => {
  return await axios.get(`/system/admin/${user_uid}`);
};

export const getSystemsByUserNotAdmin = async (user_uid: string) => {
  return await axios.get(`/system/notadmin/${user_uid}`);
};

export const getSpecificSystem = async (system_uid: string) => {
  return await axios.get(`/system/${system_uid}`);
};

export const deleteSystem = async (system_uid: string) => {
  return await axios.delete(`/system/delete/${system_uid}`);
};

export const getSystemsByUserCreatedSystem = async (user_uid: string) => {
  return await axios.get(`/system/usercreated/${user_uid}`);
};

export const requestToBeAdmin = async (data: RequestToBeAdminDto) => {
  return await axios.post("/system/join", data);
};

export const addAdminSystem = async (data: AddAdminDto) => {
  return await axios.post("/system/add", data);
};
