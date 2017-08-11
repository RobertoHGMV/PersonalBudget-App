import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  public errors: any[] = [];
  public success: any = '';

  constructor(private fb: FormBuilder, private ui: Ui, private userDataService: UserDataService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      userName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(10)
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(10)
      ])]
    });
  }

  ngOnInit() {
  }

  // checkEmail(){
  //   this.ui.lock('emailControl');

  //   setTimeout(() => {
  //     this.ui.unlock('emailControl');
  //     console.log(this.form.controls['emailControl'].value);
  //   }, 3000);
  // }

  showModal(modal){
    this.ui.setActive(modal);
  }

  hideModal(modal){
    this.ui.setInactive(modal);
  }

  closeErrors() {
    this.errors = [];
  }

  showSuccess() {
    this.success = "Operação realizada com sucesso";
  }

  closeSuccess() {
    this.success = '';
    this.router.navigateByUrl('/');
  }

  submit() {
    this.userDataService.createUser(this.form.value).subscribe(
      result => {
        this.showSuccess();
      }, error => {
        this.errors = JSON.parse(error._body).errors;
      })
  }
}
