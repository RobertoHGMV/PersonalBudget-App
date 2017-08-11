import { Component, OnInit } from '@angular/core';
import { AccountDataService } from '../../../services/account.data.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [AccountDataService]
})
export class AccountsComponent implements OnInit {
  public accounts: any[];

  constructor(private accountDataService: AccountDataService) { }

  ngOnInit() {
    this.accountDataService.getAccounts().subscribe(result => {
      this.accounts = result;
    })

  }
}
