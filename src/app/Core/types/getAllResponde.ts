export interface GetAllResponde<TClass> {
    data: Array<TClass>,
    totalCount: number,
    pageSize: number,
    currentPage: number
}