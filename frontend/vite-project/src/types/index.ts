export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Expense {
    _id: string;
    category: string;
    amount: number;
    date: string;
    description?: string;
}