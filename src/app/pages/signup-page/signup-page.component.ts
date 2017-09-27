import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationsService } from "angular2-notifications";

import { CustomValidator } from '../../validators/custom.validators';
import { Ui } from '../../utils/ui';
import { UserDataService } from '../../services/user.data.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  providers: [Ui, UserDataService]
})
export class SignupPageComponent implements OnInit {
  public form: FormGroup;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(
    private fb: FormBuilder,
    private ui: Ui,
    private userDataService: UserDataService,
    private router: Router,
    private _service: NotificationsService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])],
      lastName: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])],
      email: ['',
        Validators.compose([
          Validators.required,
          CustomValidator.EmailValidator
        ])],
      userName: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required
        ])],
      password: ['',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(10)
        ])],
      confirmPassword: ['',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(10)
        ])]
    });
  }

  showModal(modal) {
    this.ui.setActive(modal);
  }

  hideModal(modal) {
    this.ui.setInactive(modal);
  }

  //#region Validação de tela
  resetFields() {
    this.form.reset();
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
  //endRegion Validação de Tela

  showErrors(error) {
    if (error.status == 0)
      this._service.error("Mensagem do sistema", "Falha de conexão com o servidor!")
    else {
      let errors: any[] = JSON.parse(error._body).errors;
      errors.forEach(error => this._service.error("Mensagem do sistema", error.message));
    }
  }

  submit() {
    this.userDataService.createUser(this.form.value).subscribe(
      result => {
        this._service.success("Mensagem do sistema", "Operação realizada com sucesso");
      }, error => {
        this.showErrors(error);
      })
  }
}
