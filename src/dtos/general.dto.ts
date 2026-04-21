
export interface APIResponse<T> {
  status: string;
  code: string;
  msg: string;
  time: string;
  data: T;
}