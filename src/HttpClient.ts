import type {
  AxiosInstance,
  AxiosRequestConfig
} from "axios";
import axios from "axios";
import { baseURL } from "./constant";

declare module "axios" {
  export interface AxiosRequestConfig {
    withToken?: boolean;
  }
}

const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
};
//
class Axios {
  private httpInstance: AxiosInstance;

  constructor() {
    const httpInstance = axios.create({
      baseURL,
      headers,
    });

    this.httpInstance = httpInstance;
  }

  public get HttpClient(): AxiosInstance {
    return this.httpInstance;
  }

  public post<T = any, R = T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.HttpClient.post<T, R>(url, data, config);
  }

  public get<T = any, R = T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.HttpClient.get<T, R>(url, config);
  }

  public delete<T = any, R = T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.HttpClient.delete<T, R>(url, config);
  }
}

const { HttpClient } = new Axios();

export default HttpClient;
