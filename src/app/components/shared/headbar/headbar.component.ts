import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  providers: [DataService]
})
export class HeadbarComponent implements OnInit {
  public totalAccounts: number = 0;

  constructor(private accountService: AccountService, private dataService: DataService, private router: Router) {
    this.accountService.accountChange.subscribe((data) => {
      this.totalAccounts = data.length;
    });

    this.accountService.load();
  }

  ngOnInit() {
  }

  addAccount() {
    this.accountService.addAccount({ title: 'teste' });
  }

  logout() {
    this.dataService.removeLocalData();
    this.router.navigateByUrl('/');
  }
}
