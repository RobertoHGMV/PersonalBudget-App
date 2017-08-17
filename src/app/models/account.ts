export class Account {
    Id: string;
    Number: number;
    BusinessPartnerId: number;
    BusinessPartnerName: string;
    PaymentTermsId: number;
    PaymentTermsDescription: string;
    StatusId: number;
    StatusDescription: string;
    DateAdd: Date;
    DiscountTotal: number;
    DiscountPercent: number;
    SubTotal: number;
    Total: number;
    AccountDescription: string;
    NumberOfInstallments: number;
    Recurrrent: boolean;
    Comments: string;
}