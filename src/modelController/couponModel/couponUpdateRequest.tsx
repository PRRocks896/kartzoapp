export interface couponUpdateRequest {
    couponId?:string,
    couponCode?: string,
    percentage?: number,
    sellingPrice?: number,
    startDate?: string,
    endDate?: string,
    description?: string,
    isByPrice?: boolean,
    isActive?:boolean,
    title?:string,
    minAmountOrder?:number
}
