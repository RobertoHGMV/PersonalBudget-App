import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  public info: any = '';
  public errors: any = [];

  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (dataService.validLocalData())
      this.router.navigateByUrl('/home');
  }

  ngOnInit() {

  }

  showInfo() {
    this.cleanInfoAndErrors();
    this.info = "Se existir algum cadastro com o e-mail informado, enviaremos uma nova senha.";
  }

  closeInfo() {
    this.cleanInfoAndErrors();
  }

  closeErrors() {
    this.cleanInfoAndErrors();
  }

  showModal(modal) {
    this.ui.setActive(modal);
  }

  hideModal(modal) {
    this.ui.setInactive(modal);
  }

  checkValues() {
    if (!this.form.valid) {
      this.cleanInfoAndErrors();
      this.info = "Informe usuário e senha.";
    }
    else
      this.submit();
  }

  cleanInfoAndErrors() {
    this.info = '';
    this.errors = [];
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
        this.cleanInfoAndErrors();
        this.errors = JSON.parse(error._body).errors;
      });
  }
}
