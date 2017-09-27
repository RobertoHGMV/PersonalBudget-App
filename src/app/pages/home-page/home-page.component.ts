import { Component, OnInit } from '@angular/core';

import { NotificationsService } from "angular2-notifications";

import { AccountDataService } from '../../services/account.data.service';
import { Account } from '../../models/account';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  providers: [AccountDataService]
})
export class HomePageComponent implements OnInit {
  public accounts: any[];

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(private accountDataService: AccountDataService, private _service: NotificationsService) { }

  ngOnInit() {
    this.fillAccounts();
  }

  showErrors(error) {
    if (error.status == 0)
      this._service.error("Mensagem do sistema", "Falha de conexão com o servidor!")
    else {
      let errors: any[] = JSON.parse(error._body).errors;
      errors.forEach(error => this._service.error("Mensagem do sistema", error.message));
    }
  }

  getAccountsTotal() {
    if (!this.accounts)
      return;

    let total = 0;
    this.accounts.forEach(account => total += account.total);
    return total;
  }

  fillAccounts() {
    this.accountDataService.getAccounts()
      .subscribe(
      result => {
        this.accounts = result;
      },
      error => {
        this.showErrors(error);
      }
      );
  }
}
