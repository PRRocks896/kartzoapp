export interface merchantStateRequest {
    count: string,
    currentPage: string,
    items_per_page: string,
    upperPageBound: number,
    lowerPageBound: number,
    pageBound: number,
    onItemSelect: string,
    merchantdata: any,
    merchantreviewdata:any,
    switchSort: boolean,
    isStatus: boolean
}