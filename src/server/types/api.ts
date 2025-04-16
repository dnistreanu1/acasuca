export interface GenericResponse<T> {
  data?: T;
  error?: string | Error;
  status?: number;
}
