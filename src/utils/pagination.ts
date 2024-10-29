export interface PaginationQuery {
  limit: number
  page: number
}


export function setLimit(limit: number) {

  if (limit == 0 || limit == undefined) {
    return limit = 10
  }

  return limit
}

export function setPage(page: number) {

  if (page == 0 || page == undefined) {

    return page = 1
  }

  return page
}

export function getOffset(limit: number, page: number) {

  return (page - 1) * limit
}