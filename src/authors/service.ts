import { error } from "console";
import { NotFoundError, ValidationError } from "../utils/http";
import { getOffset, PaginationQuery } from "../utils/pagination";

import { authors } from "./model";
import { where } from "sequelize";

export class authorsService {

  constructor() { }

  static async createData(body: any) {
    try {
      const createData = await authors.create(body).then((result) => {
        return result
      }).catch((err) => {
        console.error(err)
        throw new ValidationError(`Error while creating data`)
      })


      return createData
    } catch (error) {
      throw error
    }
  }
  static async getById(id: number) {
    try {
      const findOne = await authors.findByPk(id).then((result) => {
        if (result == null) {
          throw new NotFoundError(`Not Found Data`)
        }
        return result
      }).catch((err) => {
        throw err
      })
      return findOne
    } catch (error) {
      throw error
    }
  }

  static async getAll(pagination: PaginationQuery) {

    try {
      const getData = await authors.findAndCountAll({ limit: pagination.limit, offset: getOffset(pagination.limit, pagination.page) }).then((result) => {
        return result
      }).catch((error) => {

        throw error
      })

      return getData
    } catch (error) {
      throw error
    }
  }

  static async updateData(id: number, body: any) {

    try {
      const update = await authors.update(body, { where: { id: id } }).then(async (result) => {
        if (result[0] > 0) {
          return await authors.findOne({ where: { id: id } }).then((result) => {
            return result
          }).catch((err) => {
            throw err
          })
        } else {
          throw new NotFoundError(`No Data Updated`)
        }
      }).catch((err) => {
        if (err instanceof NotFoundError) {
          throw err
        } else {
          throw new Error(`Sorry, Error while updating data`)
        }
      })

      return update
    } catch (error) {
      throw error
    }
  }

  static async deleteData(id: number) {
    try {
      const deleteData = await authors.update({ is_deleted: true }, { where: { id: id } }).then(async (result) => {
        if (result[0] > 0) {
          return await authors.findOne({ where: { id: id } }).then((result) => {
            return result
          }).catch((err) => {
            throw err
          })
        }
      }).catch((err) => {
        if (err instanceof NotFoundError) {
          throw err
        } else {
          throw new Error(`Sorry, Error while updating data`)
        }
      })

      return deleteData
    } catch (error) {
      throw error
    }
  }
}