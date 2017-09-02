import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class PaymentTermsDataService {

    constructor(private http: Http) { }

    getPaymentTerms() {
        var token = localStorage.getItem('pb.token');

        let headers = new Headers({ 'Content-type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(environment.serviceUrl + 'v1/paymentterms', options)
            .map((res: Response) => res.json());
    }
}