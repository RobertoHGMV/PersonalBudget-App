import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from "angular2-notifications";

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Ui } from '../../utils/ui';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [Ui, DataService]
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(
    private fb: FormBuilder,
    private ui: Ui,
    private dataService: DataService,
    private router: Router,
    private _service: NotificationsService) { }

  ngOnInit() {
    if (this.dataService.validLocalData())
      this.router.navigateByUrl('/home');
    else
      this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showInfo() {
    this._service.info("Mensagem do sistema", "Se existir algum cadastro com o e-mail informado, enviaremos uma nova senha.");
  }

  showModal(modal) {
    this.ui.setActive(modal);
  }

  hideModal(modal) {
    this.ui.setInactive(modal);
  }

  checkValues() {
    if (!this.form.valid) {
      this._service.info("Mensagem do sistema", "Informe usuário e senha.");
    }
    else
      this.submit();
  }

  showErrors(error) {
    if (error.status == 0)
      this._service.error("Mensagem do sistema", "Falha de conexão com o servidor!")
    else {
      let errors: any[] = JSON.parse(error._body).errors;
      errors.forEach(error => this._service.error("Mensagem do sistema", error.message));
    }
  }

  submit() {
    this.dataService
      .authenticate(this.form.value)
      .subscribe(
      result => {
        this.dataService.addLocalData(result.token, result.user);
        this.router.navigateByUrl('/home');
      },
      error => {
        this.showErrors(error);
      });
  }
}
