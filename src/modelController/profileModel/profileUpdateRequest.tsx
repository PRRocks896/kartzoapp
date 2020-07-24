export interface profileUpdateRequest {
    id?: number;
    roleID?: number;
    firstName?: string;
    lastName?: string,
    email?: string,
    phone?: string,
    password?: string,
    photo?: string,
    isActive?:boolean
}
