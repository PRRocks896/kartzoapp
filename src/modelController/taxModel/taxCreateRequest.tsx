export interface taxCreateRequest {
    mainCategoryId?: number,
    taxName?: string,
    percentage?: number,
    isActive?:boolean
}
