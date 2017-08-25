import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstallmentService{
    public installments: any[] = [];
    installmentChange: Observable<any>;
    installmentChangeObserver: Observer<any>;

    constructor(){
        
    }
}