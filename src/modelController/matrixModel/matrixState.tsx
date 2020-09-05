export interface matrixStateRequest {
    count: string,
    currentPage: string,
    items_per_page: string,
    upperPageBound: number,
    lowerPageBound: number,
    pageBound: number,
    onItemSelect: string,
    matrixdata: any,
    switchSort: boolean,
    isStatus: boolean
}