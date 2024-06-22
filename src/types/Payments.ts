export interface PaymentsResponse {
    id:          number;
    amount:      number;
    paymentDate: Date;
    status:      string;
    interest:    number;
    principal:   number;
    penalty:     number;
    createdAt:   Date;
    updatedAt:   Date;
    loanId:      number;
    Loan:        Loan;
}

export interface Loan {
    amount:       number;
    interestRate: number;
    duration:     number;
}
