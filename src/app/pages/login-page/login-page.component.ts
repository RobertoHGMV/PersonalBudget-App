import { Component, OnInit } from '@angular/core';
import { Ui } from '../../utils/ui';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [Ui]
})
export class LoginPageComponent implements OnInit {

  constructor(private ui: Ui) {  }

  ngOnInit() {
  }

  showModal(modal){
    this.ui.setActive(modal);
  }

  hideModal(modal){
    this.ui.setInactive(modal);
  }
}
