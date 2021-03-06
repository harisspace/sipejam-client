import axios from "axios";
import {
  AddAdminDto,
  CreateSystemDto,
  RequestToBeAdminDto,
  UpdateSystemVariables,
  UploadSystemImageVariables,
} from "../interface/system.interface";

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

export const getAllSpeed1Data = async (system_uid: string) => {
  return await axios.get(`system/speed1/${system_uid}`);
};

export const getAllSpeed2Data = async (system_uid: string) => {
  return await axios.get(`system/speed2/${system_uid}`);
};

export const getAllVehicle1Data = async (system_uid: string) => {
  return await axios.get(`system/vehicle1/${system_uid}`);
};

export const getAllVehicle2Data = async (system_uid: string) => {
  return await axios.get(`system/vehicle2/${system_uid}`);
};

export const getAllSmallVehicle1Data = async (system_uid: string) => {
  return await axios.get(`system/smallvehicle1/${system_uid}`);
};

export const getAllSmallVehicle2Data = async (system_uid: string) => {
  return await axios.get(`system/smallvehicle2/${system_uid}`);
};

export const updateSystem = async ({ updateData, system_uid }: UpdateSystemVariables) => {
  return await axios.patch(`system/update/${system_uid}`, updateData);
};

export const uploadSystemImage = async ({ system_uid, imageFile }: UploadSystemImageVariables) => {
  return await axios.patch(`system/upload/image/${system_uid}`, imageFile);
};
