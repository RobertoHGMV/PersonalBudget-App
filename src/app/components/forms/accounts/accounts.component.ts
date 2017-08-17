import { Component, OnInit } from '@angular/core';

import { AccountDataService } from '../../../services/account.data.service';
import { Account } from '../../../models/account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [AccountDataService]
})
export class AccountsComponent implements OnInit {
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
        console.log(result);
        this.accounts = result;
      },
      error => {
        this.errors = [];
        this.errors = JSON.parse(error._body).errors;
      }
      );
  }
}
