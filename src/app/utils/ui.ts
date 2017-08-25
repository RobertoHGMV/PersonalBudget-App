import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export class Ui {

    validForm(formGroup: FormGroup, validSubGroup: boolean = true) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsDirty();

            if (validSubGroup && control instanceof FormGroup) {
                this.validForm(control);
            }
        });
    }

    resetForm(form: FormGroup) {
        form.reset();
    }

    verificationValidTouched(form: FormGroup, field: string) {
        return (
            !form.get(field).valid &&
            (form.get(field).touched || form.get(field).dirty)
        );
    }

    setClassField(form: FormGroup, field) {
        return this.verificationValidTouched(form, field) ? 'is-danger' : ''
    }

    setIconInField(form: FormGroup, field) {
        return this.verificationValidTouched(form, field) ? 'fa fa-warning' : 'fa fa-check'
    }

    lock(element) {
        document.getElementById(element).classList.add('is-loading');
        document.getElementById(element).setAttribute('disabled', 'disabled');
    }

    unlock(element) {
        document.getElementById(element).classList.remove('is-loading');
        document.getElementById(element).removeAttribute('disabled');
    }

    setActive(element) {
        document.getElementById(element).classList.add('is-active');
    }

    setInactive(element) {
        document.getElementById(element).classList.remove('is-active');
    }
}