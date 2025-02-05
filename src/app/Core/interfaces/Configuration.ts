export interface Configuration {
    baseUrl: string,
    apiUrl: string
    quotasPagasRecentementeQtt: number,
    countries: Array<string>,
    pagingRange: Array<number>,
    currentPageReportTemplate: string,
    defaultPageSize: number,
    categoriaColors: any,
    googleClientId: string,
    facebookClientId: string,
}