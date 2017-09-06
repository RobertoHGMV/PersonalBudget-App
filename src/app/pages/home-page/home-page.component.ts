import { Component, OnInit } from '@angular/core';

import { AccountDataService } from '../../services/account.data.service';
import { Account } from '../../models/account';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  providers: [AccountDataService]
})
export class HomePageComponent implements OnInit {
  public errors: any[];
  public accounts: any[];

  constructor(private accountDataService: AccountDataService) { }

  ngOnInit() {
    this.fillAccounts();
  }

  fillAccounts() {
    this.accountDataService.getAccounts()
      .subscribe(
      result => {
        this.accounts = result;
      },
      error => {
        this.errors = [];
        this.errors = JSON.parse(error._body).errors;
      }
      );
  }

  getAccountsTotal() {
    if (!this.accounts)
      return;

    let total = 0;
    this.accounts.forEach(account => total += account.total);
    return total;
  }
}
