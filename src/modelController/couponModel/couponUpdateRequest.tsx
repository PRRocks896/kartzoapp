export interface couponUpdateRequest {
    id?:string,
    couponcode?: string,
    percentage?: string,
    discountprice?: string,
    startdate?: Date,
    enddate?: string,
    discription?: string,
    isByPrice?: boolean
}
