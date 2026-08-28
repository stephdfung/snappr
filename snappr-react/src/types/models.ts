export interface User {
  id?: number;
  name?: string;
  nickname?: string;
  email?: string;
}

export interface Pic {
  id: number;
  user_id: number;
  canvas_img: string;
}
