export interface payoutStateRequest {
    count: string,
    currentPage: string,
    items_per_page: string,
    upperPageBound: number,
    lowerPageBound: number,
    pageBound: number,
    onItemSelect: string,
    payoutdata: any,
    switchSort: boolean,
    isStatus: boolean
}