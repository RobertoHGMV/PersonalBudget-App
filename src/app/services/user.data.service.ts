import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserDataService {
    private serviceUrl: string = 'http://localhost:51664/'

    constructor(private http: Http) { }

    createUser(data: any) {
        return this.http
        .post(environment.serviceUrl + 'v1/user', data)
        .map((res: Response) => res.json());
    }

    getTest() {
        return this.http
            .get('http://personalbudget-api.azurewebsites.net/v1/paymentterms')
            .map((res: Response) => res.json());
    }
}