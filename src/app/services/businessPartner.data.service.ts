import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class BusinessPartnerDataService {

    constructor(private http: Http) { }

    getBusinessPartners(){
        var token = localStorage.getItem('pb.token');

        let headers = new Headers({ 'Content-type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });

        return this.http
        .get(environment.serviceUrl + 'v1/businesspartner', options)
        .map((res: Response) => res.json());
    }

    getBusinessPartner(id: number){
        var token = localStorage.getItem('pb.token');

        let headers = new Headers({ 'Content-type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({ headers: headers });

        return this.http
        .get(environment.serviceUrl + 'v1/businesspartner/' + id, options)
        .map((res: Response) => res.json());
    }
}