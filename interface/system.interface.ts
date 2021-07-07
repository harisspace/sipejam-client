export interface CreateSystemDto {
  name: string;
  placed: string;
  system_maker: string;
}

export interface System {
  name: string;
  placed: string;
  id: string;
  system_uid: string;
  status: string;
  system_maker: string;
  image_uri: string;
}
