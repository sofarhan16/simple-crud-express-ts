import { Response } from "express"

interface ApiRespDto {
  code: number,
  message: string,
  data: any,
  error: any
}

export class ValidationError extends Error {
  constructor(message: string) {

    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {

  constructor(message: string) {

    super(message)
    this.name = "NotFoundError"
  }
}

export function SuccessResp(res: Response, data: any) {

  let respon: ApiRespDto = {
    code: 200,
    message: "Success",
    data: data,
    error: ""
  }

  res.status(respon.code).send(respon)

}


export function NotFoundResp(res: Response, err: any) {

  let respon: ApiRespDto = {
    code: 404,
    message: "Not Found",
    data: {},
    error: err.message
  }

  res.status(respon.code).send(respon)
}


export function BadRequestResp(res: Response, err: any) {
  let respon: ApiRespDto = {
    code: 400,
    message: "Bad Request",
    data: {},
    error: err.message
  }

  res.status(respon.code).send(respon)
}

export function InternalServerResp(res: Response, err: any) {
  let respon: ApiRespDto = {
    code: 500,
    message: "Internal Server Error",
    data: {},
    error: err.message
  }

  res.status(respon.code).send(respon)
}

