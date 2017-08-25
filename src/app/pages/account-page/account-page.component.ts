import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationsService } from "angular2-notifications";

import { CustomValidator } from '../../validators/custom.validators';
import { AccountDataService } from '../../services/account.data.service';
import { Ui } from '../../utils/ui';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  providers: [AccountDataService, Ui]
})

export class AccountPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];
  public showItems: boolean = true;
  public showInstallment: boolean = true;

  public paymentTerms: any[] = [];
  public items: any[] = [];
  public installments: any[] = [];

  public percent: any = 0;
  public discount: any = 0;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(private fb: FormBuilder, private accountDataService: AccountDataService,
    public ui: Ui, private _service: NotificationsService) { }

  ngOnInit() {
    let newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let currentDate = year+'-'+month+'-'+day;

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
      discountPercent: [0, Validators.min(0)],
      discountTotal: [0, Validators.min(0)],
      accountDescription: ['', Validators.maxLength(100)],
      recurrent: [false],
      accountComments: ['', Validators.maxLength(4000)],
      dueDateBase: [currentDate, Validators.required],
      installmentNumber: [0, Validators.min(0)],
      // installmentValue: ['', Validators.min(0.01)],

      item: this.fb.group({
        title: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])],
        price: [0, Validators.compose([
          Validators.min(0.01),
          Validators.required
        ])],
        quantity: [0, Validators.compose([
          Validators.min(1),
          Validators.required
        ])],
        purchaseDate: [currentDate]
      }),
      
      installment: this.fb.group({
        total: [0, Validators.compose([
          Validators.min(0),
          Validators.required
        ])],
        dueDate: [currentDate, Validators.required],
        comments: ['', Validators.maxLength(4000)]
      })
    });
  }

  resetFields() {
    this.form.patchValue({
      businessPartnerFirstName: null,
      businessPartnerLastName: null,
      paymentTermsId: null,
      accountDescription: null,
      item: {
        title: null,
        price: null,
        quantity: null,
        purchaseDate: null
      }
    });
  }

  showErrors() {
    console.log(this.errors);
    this.errors.forEach(error => this._service.error("Mensagem do sistema", error));
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

  checkIfShowItems() {
    this.showItems = true;

    var fields = [
      'businessPartnerFirstName',
      'businessPartnerLastName',
      'paymentTermsId',
      'dueDateBase'
    ];

    fields.forEach(field => {
      if (this.showItems && !this.form.get(field).valid)
        this.showItems = false;
    });

    this.ui.validForm(this.form, false);
  }

  //#region Items
  addItem() {
    var item = this.form.get('item').value;
    this.items.push(item);

    this.changeDiscountValue();
    this.setInstallments();
  }

  editItem(item: any) {
    let indexOf = this.items.indexOf(item);
    this.items[indexOf] = this.form.get('item').value;

    this.changeDiscountValue();
    this.setInstallments();
  }

  removeItem(item: any) {
    var indexOf = this.items.indexOf(item);
    this.items.splice(indexOf, 1);

    this.changeDiscountValue();
    this.setInstallments();
  }

  getItemValueTotal(item: any) {
    return this.accountDataService.getItemValueTotal(item.quantity, item.price);
  }

  getAccountSubTotal() {
    return this.accountDataService.getSubTotal(this.items);
  }
  //#endRegion Items

  getAccountTotal() {
    let subTotal = this.getAccountSubTotal();
    let discount = this.form.get('discountTotal').value;
    return this.accountDataService.getTotal(subTotal, discount);
  }

  //#region Discount
  changeDiscountPercent() {
    let percent = this.form.get('discountPercent').value;
    let subTotal = this.getAccountSubTotal();

    if (percent < 0 || percent > 100) {
      this.setDiscountZero();
      return;
    }

    let discount = this.accountDataService.getDiscountValue(subTotal, percent);

    if (this.checkDiscount(discount, subTotal) || subTotal === 0) {
      this.showErrorDiscount();
      return;
    }

    this.form.get('discountTotal').setValue(discount);
    this.discount = discount;
    this.percent = percent;
  }

  changeDiscountValue() {
    let discount = this.form.get('discountTotal').value;
    let subTotal = this.getAccountSubTotal();

    if (discount < 0) {
      this.setDiscountZero();
      return;
    }

    if (this.checkDiscount(discount, subTotal)) {
      this.showErrorDiscount();
      return;
    }

    let percent = this.accountDataService.getDiscountPercent(subTotal, discount)

    this.form.get('discountPercent').setValue(percent);
    this.percent = percent;
    this.discount = !discount ? 0 : discount;
  }

  showErrorDiscount() {
    this.setDiscountZero();
    this._service.error("Mensagem do sistema", "Valor do desconto excede Subtotal");
  }

  setDiscountZero() {
    this.form.get('discountTotal').setValue(0);
    this.form.get('discountPercent').setValue(0);
    this.discount = 0;
    this.percent = 0;
  }

  checkDiscount(discount: number, subTotal: number) {
    if (discount > subTotal)
      return true

    return false;
  }
  //#endRegion Discount

  //#region Installments
  isValidInstallment(accountTotal: number, installmentTotal: number, dueDateBase: Date) {
    this.errors = [];

    if (accountTotal <= 0 || !accountTotal)
      this.errors.push("Informe um item");
    if (installmentTotal <= 0 || !installmentTotal)
      this.errors.push("Informe a quantidade de parcelas");
    if (!dueDateBase)
      this.errors.push("Informe a data base");

    return this.errors.length > 0 ? false : true;
  }

  setInstallments() {
    let accountTotal = this.getAccountTotal();
    let installmentTotal = this.form.get('installmentNumber').value;
    let dueDateBase = this.form.get('dueDateBase').value;

    if (accountTotal <= 0 || !accountTotal) {
      this.form.get('installmentNumber').setValue(0);
      this.installments = [];
      return;
    }

    this.installments = this.accountDataService.getInstallments(accountTotal, installmentTotal, dueDateBase);
    console.log(this.installments);
  }
  //#endRegion Installments

  dueDateChange() {
    this.setInstallments();
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.accountDataService.createAccount(this.form.value).subscribe(
        result => {
          this._service.success("Mensagem do sistema", "Operação realizada com sucesso");
          this.resetFields();
        },
        error => this.errors = JSON.parse(error._body).errors
      )
    }
    else {
      this.ui.validForm(this.form);
    }
  };

}
