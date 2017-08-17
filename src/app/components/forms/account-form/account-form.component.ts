import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationsService } from "angular2-notifications";

import { CustomValidator } from '../../../validators/custom.validators';
import { AccountDataService } from '../../../services/account.data.service';
import { Ui } from '../../../utils/ui';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
  providers: [AccountDataService, Ui]
})
export class AccountFormComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(private fb: FormBuilder, private accountDataService: AccountDataService, public ui: Ui, private _service: NotificationsService) { }

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

  showSuccess(msg: string = "Operação realizada com sucesso") {
    this._service.success("Mensagem do sistema", msg);
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

  submit() {
    this.accountDataService.createAccount(this.form.value).subscribe(
      result => {
        this.showSuccess();
        this.ui.resetForm(this.form);
      },
      error => this.errors = JSON.parse(error._body).errors
    )
  };
}
