export interface LoansResponse {
    id:           number;
    amount:       number;
    interestRate: number;
    duration:     number;
    startDate:    Date;
    endDate:      Date;
    status:       string;
    createdAt:    Date;
    updatedAt:    Date;
    borrowerId:   number;
    Borrower:     Borrower;
}

export interface Borrower {
    name:  string;
    email: string;
}

export interface LoanCreate {
    amount:       number;
    interestRate: number;
    duration:     number;
    startDate:    Date;
    endDate:      Date;
    status?:       string;
    borrowerId:   number;
}