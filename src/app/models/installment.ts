export class Installment {
    accountId: number;
    sequence: number;
    dueDate: Date;
    total: number;
    comments: string;
    recurrent: boolean;
}