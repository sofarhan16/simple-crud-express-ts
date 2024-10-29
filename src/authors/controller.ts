import { create } from "domain"
import * as http from "../utils/http"
import { Request, Response } from "express"
import { authorsService } from "./service"
import { PaginationQuery, setLimit } from "../utils/pagination"



export const createAuthors = async (req: Request, res: Response) => {
  try {

    let body = {
      name: req.body.name,
      bio: req.body.bio,
      birth_date: req.body.birth_date
    }

    const created = await authorsService.createData(body)


    return http.SuccessResp(res, created)

  } catch (error) {
    if (error instanceof http.ValidationError) {
      return http.BadRequestResp(res, error)
    } else if (error instanceof http.NotFoundError) {
      return http.NotFoundResp(res, error)
    }

    return http.InternalServerResp(res, error)
  }
}


export const authorsByid = async (req: Request, res: Response) => {
  try {

    let id: number = Number(req.params.id)

    if (id === null) {
      throw new http.ValidationError(`Invalid Value ID`)
    }
    const getData = await authorsService.getById(id)

    return http.SuccessResp(res, getData)

  } catch (error) {
    if (error instanceof http.ValidationError) {
      return http.BadRequestResp(res, error)
    } else if (error instanceof http.NotFoundError) {
      return http.NotFoundResp(res, error)
    }
    return http.InternalServerResp(res, error)
  }
}


export const allAuthors = async (req: Request, res: Response) => {

  try {
    let pagination: PaginationQuery = {
      limit: setLimit(Number(req.query.limit)),
      page: setLimit(Number(req.query.page))
    }


    const getAll = await authorsService.getAll(pagination)


    return http.SuccessResp(res, getAll)

  } catch (error) {
    if (error instanceof http.ValidationError) {
      return http.BadRequestResp(res, error)
    } else if (error instanceof http.NotFoundError) {
      return http.NotFoundResp(res, error)
    }
    return http.InternalServerResp(res, error)
  }
}

export const updateAuthors = async (req: Request, res: Response) => {
  try {

    let update = await authorsService.updateData(Number(req.params.id), req.body)

    return http.SuccessResp(res, update)
  } catch (error) {
    if (error instanceof http.ValidationError) {
      return http.BadRequestResp(res, error)
    } else if (error instanceof http.NotFoundError) {
      return http.NotFoundResp(res, error)
    }
    return http.InternalServerResp(res, error)
  }
}


export const deleteAuthors = async (req: Request, res: Response) => {
  try {
    let deleteData = await authorsService.deleteData(Number(req.params.id))

    return http.SuccessResp(res, deleteData)
  } catch (error) {
    if (error instanceof http.ValidationError) {
      return http.BadRequestResp(res, error)
    } else if (error instanceof http.NotFoundError) {
      return http.NotFoundResp(res, error)
    }
    return http.InternalServerResp(res, error)
  }
}