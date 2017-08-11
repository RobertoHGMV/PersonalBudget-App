import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class AccountDataService {

    constructor(private http: Http) { }

    getAccounts() {
        return this.http
            .get('http://personalbudget-api.azurewebsites.net/v1/paymentterms')
            .map((res: Response) => res.json());
    }
}