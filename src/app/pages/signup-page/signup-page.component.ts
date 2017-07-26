import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validators';
import { Ui } from '../../utils/ui';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  providers: [Ui]
})
export class SignupPageComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private ui: Ui) {
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
}
