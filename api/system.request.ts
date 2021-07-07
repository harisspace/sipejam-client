import axios from "axios";
import { CreateSystemDto } from "../interface/system.interface";

export const createSystemRequest = async (data: CreateSystemDto) => {
  return await axios.post("/system/create", data);
};

export const getSystemsRequest = async () => {
  return await axios.get("/system");
};

export const getSystemsByUserAdmin = async (user_uid: string) => {
  return await axios.get(`/system/admin/${user_uid}`);
};

export const getSpecificSystem = async (system_uid: string) => {
  return await axios.get(`/system/${system_uid}`);
};
