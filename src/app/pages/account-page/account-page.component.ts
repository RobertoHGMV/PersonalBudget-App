import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationsService } from "angular2-notifications";

import { CustomValidator } from './../../validators/custom.validators';
import { DateHelper } from './../../helpers/date.helper';
import { AccountDataService } from './../../services/account.data.service';
import { PaymentTermsDataService } from './../../services/paymentTerms.data.service';
import { Ui } from './../../utils/ui';
import { Item } from './../../models/item';
import { Installment } from './../../models/installment';
import { BusinessModalComponent } from './../../components/modals/business-modal/business-modal.component';
import { BusinessPartnerDataService } from './../../services/businessPartner.data.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  providers: [AccountDataService, PaymentTermsDataService, Ui, BusinessModalComponent, BusinessPartnerDataService]
})

export class AccountPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];

  public paymentTerms: any[] = [];
  public percent: any = 0;
  public discount: any = 0;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(
    private _fb: FormBuilder,
    private _accountDataService: AccountDataService,
    private _paymentTermsDataService: PaymentTermsDataService,
    public ui: Ui,
    private _service: NotificationsService,
    private _businessModal: BusinessModalComponent) { }

  ngOnInit() {
    this.fillPaymentTerms();
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      businessPartnerFirstName: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])],
      businessPartnerLastName: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])],
      businessPartnerId: [0],
      paymentTermsId: [0, Validators.required],
      discountPercent: [0, Validators.min(0)],
      discountTotal: [0, Validators.min(0)],
      accountDescription: ['', Validators.maxLength(100)],
      recurrent: [false],
      comments: ['', Validators.maxLength(4000)],
      dueDateBase: [DateHelper.getCurrentDate(), Validators.required],
      installmentNumber: [0, Validators.min(1)],

      items: this._fb.array([]),
      installments: this._fb.array([])
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  get installments(): FormArray {
    return this.form.get('installments') as FormArray;
  }

  getFormGroupFromArray(index, formArrayName) {
    let control = <FormArray>this.form.controls[formArrayName];
    return control.at(index) as FormGroup;
  }

  //#region Validação de tela
  resetFields() {
    this.form.reset();
    this.setitems([]);
    this.setinstallments([]);
  }

  validField(field, index, formArrayName) {
    let formGroup: FormGroup;

    if (index != null && formArrayName != null)
      formGroup = this.getFormGroupFromArray(index, formArrayName);
    else
      formGroup = this.form;

    return this.ui.verificationValidTouched(formGroup, field);
  }

  setClass(field, index, formArrayName) {
    let formGroup: FormGroup;

    if (index != null && formArrayName != null)
      formGroup = this.getFormGroupFromArray(index, formArrayName);
    else
      formGroup = this.form;

    return this.ui.setClassField(formGroup, field);
  }

  setIcon(field, index, formArrayName) {
    let formGroup: FormGroup;

    if (index != null && formArrayName != null)
      formGroup = this.getFormGroupFromArray(index, formArrayName);
    else
      formGroup = this.form;

    return this.ui.setIconInField(formGroup, field);
  }
  //endRegion Validação de Tela

  //#region Items
  setitems(items: Item[]) {
    const itemFGs = items.map(item => this._fb.group(item));
    const itemFormArray = this._fb.array(itemFGs);
    this.form.setControl('items', itemFormArray);
  }

  addItems() {
    let itemGroup: FormGroup = this._fb.group({
      title: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])],
      quantity: [0,
        Validators.compose([
          Validators.min(1),
          Validators.required
        ])],
      price: [0,
        Validators.compose([
          Validators.min(0.01),
          Validators.required
        ])],
      purchaseDate: [DateHelper.getCurrentDate(), Validators.required]
    });

    this.items.push(itemGroup);
  }

  editItem() {
    this.changeDiscountValue();
    this.setInstallments();
  }

  removeItem(index: any) {
    let items = this.form.get('items') as FormArray;
    items.removeAt(index);

    this.changeDiscountValue();
    this.setInstallments();
  }

  getItemValueTotal(item: any) {
    let currentItem = item.value;
    return this._accountDataService.getItemValueTotal(currentItem.quantity, currentItem.price);
  }

  getAccountSubTotal() {
    let items = this.form.get('items') as FormArray;
    return this._accountDataService.getSubTotal(items.value);
  }
  //#endRegion Items

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

  setinstallments(installments: Installment[]) {
    const installmentFGs = installments.map(installment => this.createInstallmentFormGroup(installment));
    const installmentFormArray = this._fb.array(installmentFGs);
    this.form.setControl('installments', installmentFormArray);
  }

  createInstallmentFormGroup(installment: Installment) {
    let installmentGroup: FormGroup = this._fb.group({
      total: [installment.total,
      Validators.compose([
        Validators.min(0.01),
        Validators.required
      ])],
      sequence: [installment.sequence],
      dueDate: [installment.dueDate, Validators.required],
      comments: [installment.comments, Validators.maxLength(4000)],
      recurrent: [installment.recurrent]
    });

    return installmentGroup;
  }

  setInstallments() {
    let accountTotal = this.getAccountTotal();
    let installmentTotal = this.form.get('installmentNumber').value;
    let dueDateBase = this.form.get('dueDateBase').value;
    let recurrent = this.form.get('recurrent').value;

    if (installmentTotal > 1000)
      this.form.get('installmentNumber').setValue(1000);

    if (accountTotal <= 0 || !accountTotal) {
      this.form.get('installmentNumber').setValue(0);
      this.setinstallments([]);
      return;
    }

    let installments = this._accountDataService.getInstallments(accountTotal, installmentTotal, dueDateBase, recurrent);

    this.setinstallments(installments);
  }

  removeInstallment(index: any) {
    let installments = this.form.get('installments') as FormArray;
    installments.removeAt(index);

    let installmentFormArray = this.form.get('installments') as FormArray;
    this.form.get('installmentNumber').setValue(installmentFormArray.length);

    this.setInstallments();
  }

  totalChange(installment: FormGroup) {
    let installmentsForm = this.form.get('installments') as FormArray;
    let accountTotal = this.getAccountSubTotal();

    let installmentsTotal: number = 0;

    for (let i = 0; i < installmentsForm.length; i++) {
      var installmentGroup = this.getFormGroupFromArray(i, 'installments');
      installmentsTotal = installmentsTotal + installmentGroup.get('total').value;
    }

    if (installmentsTotal > accountTotal) {
      installment.get('total').setValue(0);

      this._service.error("Mensagem do sistema", "Valor das parcelas excede valor da conta!")
    }
  }
  //#endRegion Installments

  //#region Discount
  changeDiscountPercent() {
    let percent = this.form.get('discountPercent').value;
    let subTotal = this.getAccountSubTotal();

    if (percent < 0 || percent > 100) {
      this.setDiscountZero();
      return;
    }

    let discount = this._accountDataService.getDiscountValue(subTotal, percent);

    if (this.checkDiscount(discount, subTotal) || subTotal === 0) {
      this.showErrorDiscount();
      return;
    }

    this.form.get('discountTotal').setValue(discount);
    this.discount = discount;
    this.percent = percent;

    this.setInstallments();
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

    let percent = this._accountDataService.getDiscountPercent(subTotal, discount)

    this.form.get('discountPercent').setValue(percent);
    this.percent = percent;
    this.discount = !discount ? 0 : discount;

    this.setInstallments();
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

  getAccountTotal() {
    let subTotal = this.getAccountSubTotal();
    let discount = this.form.get('discountTotal').value;
    return this._accountDataService.getTotal(subTotal, discount);
  }

  dueDateChange() {
    this.setInstallments();
  }

  recurrentChange() {
    let installmentsForm = this.form.get('installments') as FormArray;
    let recurrent = this.form.get('recurrent').value;

    for (let i = 0; i < installmentsForm.length; i++) {
      var installmentGroup = this.getFormGroupFromArray(i, 'installments');
      installmentGroup.get('recurrent').setValue(recurrent);
    }
  }

  //#region BusinessPartner
  showBusinessPartner() {
    this._businessModal.showModal();
  }

  setBusinessPartner(event) {
    this.form.patchValue({
      businessPartnerId: event.partner.id,
      businessPartnerFirstName: event.partner.firstName,
      businessPartnerLastName: event.partner.lastName
    });
  }
  //endRegion

  showErrors(error) {
    if (error.status == 0)
      this._service.error("Mensagem do sistema", "Falha de conexão com o servidor!")
    else {
      let errors: any[] = JSON.parse(error._body).errors;
      errors.forEach(error => this._service.error("Mensagem do sistema", error.message));
    }
  }

  fillPaymentTerms() {
    this._paymentTermsDataService.getPaymentTerms().subscribe(
      result => {
        this.paymentTerms = result;
      },
      error => {
        this.showErrors(error);
      });
  }

  submit() {
    this.ui.lock('btnSave');

    if (this.form.valid) {
      this._accountDataService.createAccount(this.form.value).subscribe(
        result => {
          this._service.success("Mensagem do sistema", "Operação realizada com sucesso");
          this.resetFields();
        },
        error => {
          this.showErrors(error);
        }
      )
    }
    else {
      this.ui.validForm(this.form);
    }

    this.ui.unlock('btnSave');
  }

}
