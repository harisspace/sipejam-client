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

export interface Speed1 {
  id: string;
  speeds1_uid: string;
  speed: number;
  created_at: string;
}

export interface Speed2 {
  id: string;
  speeds2_uid: string;
  speed: number;
  created_at: string;
}

export interface Vehicle1 {
  id: string;
  vehicle1_uid: string;
  vehicle: number;
  created_at: string;
}

export interface Vehicle2 {
  id: string;
  vehicle2_uid: string;
  vehicle: number;
  created_at: string;
}

export interface WebsocketEvent {
  data: { iot_token: string; speed?: number; vehicle?: number };
  event: string;
}
