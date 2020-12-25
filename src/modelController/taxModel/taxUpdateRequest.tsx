export interface taxUpdateRequest {
    taxId?: number,
    mainCategoryId?: number,
    taxName?: string,
    percentage?: number,
    isActive?:boolean
}
