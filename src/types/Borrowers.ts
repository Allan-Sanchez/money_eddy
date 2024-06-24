export interface BorrowersResponse {
    id:          number;
    name:        string;
    email:       string;
    phoneNumber: string;
    address:     string;
    reference?:        string;
    state?:       string;
    createdAt:   Date;
    updatedAt:   Date;
}



export interface BorrowerCreate {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    reference?: string;
}
