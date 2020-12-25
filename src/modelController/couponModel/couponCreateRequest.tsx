export interface couponCreateRequest {
    couponCode?: string,
    sellingPrice?: number,
    startDate?: string,
    endDate?: string,
    description?: string,
    isActive?:boolean,
    title?:string,
    minAmountOrder?:number
}
