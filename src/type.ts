export interface IFilterParams {
  pageIndex: number;
  pageSize: number;
  results: number;
}

export interface CommonResponse<D = any> {
  data: D | null;
  httpStatusCode: number;
  success: boolean;
  total: number;
  message: string;
  totalDone: number;
  totalNotDone: number;
  recordStatistics?: D | null;
}

export interface IFilter {
  fullName: string;
  userName: string;
  [key: string]: string;
}

export interface IListData {
  id: string;
  fullName: string;
  userName: string;
  icon: string;
  [key: string]: string;
}