import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    authenticate(data: any) {
        var dt = "grant_type=password&username=" + data.username + "&password=" + data.password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceUrl + 'v1/authenticate', dt, options).map((res: Response) => res.json());
    }

    addLocalData(token, user) {
        localStorage.setItem('pb.token', token);
        localStorage.setItem('pb.user', JSON.stringify(user))
    }

    removeLocalData() {
        // localStorage.clear();
        localStorage.removeItem('pb.token');
        localStorage.removeItem('pb.user');
    }

    validLocalData() {
        if (!localStorage.getItem('pb.token')) {
            return false;
        }

        if (!localStorage.getItem('pb.user')) {
            return false;
        }

        let data: any = JSON.parse(localStorage.getItem('pb.user'))
        if (!data) {
            return false;
        }

        return true;
    }
}