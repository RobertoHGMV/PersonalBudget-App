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
}