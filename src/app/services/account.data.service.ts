import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class AccountDataService {

    constructor(private http: Http) { }

    getAccounts() {
        var token = localStorage.getItem('pb.token');

        let headers = new Headers({ 'Content-type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(environment.serviceUrl + 'v1/account', options)
            .map((res: Response) => res.json());
    }

    createAccount(data: any) {
        var token = localStorage.getItem('pb.token');
        let headers = new Headers({ 'ContentType': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post(environment.serviceUrl + 'v1/account', data, options)
            .map((res: Response) => res.json());
    }

    updateAccount(data: any) {
        var token = localStorage.getItem('pb.token');
        let headers = new Headers({ 'ContentType': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .put(environment.serviceUrl + 'v1/account', data, options)
            .map((res: Response) => res.json());
    }

    deleteAccount(data: any) {
        var token = localStorage.getItem('pb.token');
        let headers = new Headers({ 'ContentType': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers, body: data });

        return this.http
            .delete(environment.serviceUrl + 'v1/account', options)
            .map((res: Response) => res.json());
    }

    getItemValueTotal(quantity: number, value: number) {
        return quantity * value;
    }

    getSubTotal(items: any[]) {
        let totalBeforeDiscount: number = 0;

        for (let item of items)
            totalBeforeDiscount += item.price * item.quantity;

        return totalBeforeDiscount;
    }

    getTotal(subTotal: number, discount: number) {
        return subTotal - discount;
    }

    getDiscountValue(subTotal: number, discountPercent: any) {
        let discount = subTotal * discountPercent / 100;
        return Math.trunc(100 * discount) / 100;
    }

    getDiscountPercent(subTotal: number, discountValue: any) {
        let percent = discountValue / (subTotal === 0 ? 1 : subTotal) * 100;
        return Math.trunc(100 * percent) / 100;
    }

    getinstallmentValue(accountTotal: number, quantityInstallment: number) {
        let qtd = !quantityInstallment || quantityInstallment == 0 ? 1 : quantityInstallment;
        let value = accountTotal / qtd;
        return parseFloat(value.toFixed(2));
    }

    getInstallments(accountTotal: number, quantityInstallment: number, dueDateBase: Date) {
        let installments: any[] = [];
        let installmentValue = this.getinstallmentValue(accountTotal, quantityInstallment);
        let installmentsTotal: number = installmentValue * quantityInstallment;

        for (let i = 1; i <= quantityInstallment; i++) {
            let newDate = new Date(dueDateBase);
            newDate.setMonth(newDate.getMonth()+1+i);
            newDate.setDate(newDate.getDate()+1);

            installments.push({
                sequence: i,
                dueDate: newDate,
                total: installmentValue,
                comments: ""
            });
        }

        if (installments.length > 0) {
            let instTotal = accountTotal - installmentsTotal;
            let value = installmentValue + parseFloat(instTotal.toFixed(2));
            installments[installments.length - 1].total = parseFloat(value.toFixed(2));
        }

        return installments;
    }
}