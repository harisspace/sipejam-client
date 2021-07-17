import { User } from "./user.interface";

// DTO
export interface CreateSystemDto {
  name: string;
  placed: string;
  system_maker: string;
}

export interface RequestToBeAdminDto {
  title: string;
  message: string;
  from_uid: string;
  to_uid: string;
  payload: string;
}

export interface AddAdminDto {
  user_uid: string;
  system_uid: string;
}

// interface

export interface System {
  name: string;
  placed: string;
  id: string;
  system_uid: string;
  status: string;
  system_maker: string;
  image_uri: string;
}

export interface SystemAndUser {
  name: string;
  placed: string;
  id: string;
  system_uid: string;
  status: string;
  system_maker: string;
  image_uri: string;
  users: User;
}
