export interface taxStateRequest {
    count: string,
    currentPage: string,
    items_per_page: string,
    upperPageBound: number,
    lowerPageBound: number,
    pageBound: number,
    onItemSelect: string,
    taxdata: any,
    switchSort: boolean,
    isStatus: boolean
}