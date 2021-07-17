export interface ISignup {
  email: string;
  username: string;
  password: string;
}

export interface ISignin {
  email: string;
  password: string;
}

export interface User {
  id: string;
  user_uid: string;
  username: string;
  email: string;
  user_role: string;
  image_uri: string;
  confirmed: string;
  created_at: string;
  updated_at: string;
}

export interface UserJwt {
  email: string;
  iat: number;
  user_role: string;
  user_uid: string;
  username: string;
  image_uri: string;
}

export interface INotification {
  notification_uid: string;
  message: string;
  title: string;
  created_at: string;
  updated_at: string;
  read: boolean;
  from_uid: string;
  to_uid: string;
  id: string;
  payload: string;
  users_notifications_from_uidTousers: User;
}
