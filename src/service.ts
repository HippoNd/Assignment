import HttpClient from "./HttpClient";
import { CommonResponse } from "./type";

export const getData = async () => {
  return HttpClient.get<null, CommonResponse<any>>("/api/?results=100");
};
