import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {
    public accounts: any[] = [];
    accountChange: Observable<any>;
    accountChangeObserver: Observer<any>;

    constructor() {
        this.accountChange = new Observable((observer: Observer<any>) => {
            this.accountChangeObserver = observer;
        })
    }

    //Visualizar informação com observable-------------------------
    addAccount(account) {
        this.getItems();
        if (this.hasItem(account.id)) {
            this.updateQuantity(account.id, 1);
        } else {
            this.accounts.push(account);
        }
        this.save();
        this.accountChangeObserver.next(this.accounts);
    }

    // alterar a conta, apenas exemplo
    updateQuantity(id, quantity) {
        for (let i of this.accounts) {
            if (i.id == id) {
                i.quantity += +quantity;
            }
        }
        this.accountChangeObserver.next(this.accounts);
    }

    hasItem(id): boolean {
        for (let i of this.accounts) {
            if (i.id == id) {
                return true;
            }
        }
        this.accountChangeObserver.next(this.accounts);
        return false;
    }

    getItems(): any[] {
        var data = localStorage.getItem('pb.account');
        if (data) {
            this.accounts = JSON.parse(data);
        }
        this.accountChangeObserver.next(this.accounts);
        return this.accounts;
    }

    save() {
        localStorage.setItem('pb.account', JSON.stringify(this.accounts));
    }

    load() {
        var data = localStorage.getItem('pb.account');
        if (data)
            this.accounts = JSON.parse(data);

        this.accountChangeObserver.next(this.accounts);
    }

    clear() {
        this.accounts = [];
        localStorage.removeItem('pb.account');
        this.accountChangeObserver.next(this.accounts);
    }

    removeItem(id: string) {
        for (var account of this.accounts) {
            if (account.id == id) {
                var index = this.accounts.indexOf(account);
                this.accounts.splice(index, 1);
            }
        }
        localStorage.setItem('pb.account', JSON.stringify(this.accounts));
        this.accountChangeObserver.next(this.accounts);
    }
    //Fim Visualizar informação com observable-------------------------

    getSubTotal(): number {
        var result: number = 0;
        for (let i of this.accounts) {
            result += +(+i.price * +i.quantity);
        }
        this.accountChangeObserver.next(this.accounts);
        return result;
    }
}