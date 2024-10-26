export class Apierror extends Error {
  statusCode: number;
  status: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.status = statusCode > 400 && statusCode < 500 ? "fail" : "error";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export class Apiresponse {
  status: string;
  statuscode: number;
  message: string;
  data: any;

  constructor(statuscode: number, message: string, data: any) {
    this.status = "Sucess";
    this.statuscode = statuscode;
    this.message = message;
    this.data = data;
  }
}
