import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomValidator } from '../../../validators/custom.validators';
import { AccountDataService } from '../../../services/account.data.service';
import { Ui } from '../../../utils/ui';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
  providers: [AccountDataService, Ui, NotificationComponent]
})
export class AccountFormComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];
  public success: any = '';

  constructor(private fb: FormBuilder, private accountDataService: AccountDataService, public ui: Ui, private notify: NotificationComponent) { }

  ngOnInit() {
    this.form = this.fb.group({
      businessPartnerFirstName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      businessPartnerLastName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      paymentTermsId: ['', Validators.compose([
        Validators.required,
        CustomValidator.SelectValidator
      ])],
      accountDescription: ['', Validators.maxLength(100)],
      accountComments: ['', Validators.maxLength(100)]
    });
  }

  validField(field) {
    return this.ui.verificationValidTouched(this.form, field);
  }

  setClass(field) {
    return this.ui.setClassField(this.form, field);
  }

  setIcon(field) {
    return this.ui.setIconInField(this.form, field);
  }

  teste(){
    this.notify.showNotification('is-danger', 'tes');
  }

  submit() {
    this.accountDataService.createAccount(this.form.value).subscribe(
      result => {
        this.ui.showSuccess(this.success);
        this.ui.resetForm(this.form);
      },
      error => this.errors = JSON.parse(error._body).errors
    )
  };
}
