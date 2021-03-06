﻿export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Обезательно',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Неправильный email',
            'invalidUrlDomain': 'Нужно указать сайт sportsdirect.com',
            'emailAlreadyUse': 'email уже используется',
            'invalidPassword': 'Неправильный пароль. Пароль должен быть не менее 6 символов и содержать числа.',
            'minlength': `Минимальная длина ${validatorValue.requiredLength}`
        };

        return config[validatorName];
    }

    static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static emailIsUsedValidator(control) {
        return { 'emailAlreadyUse': true };
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[а-яА-Яa-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static urlValidator(control) {
        console.log(typeof control);
        if (control.value.match(/sportsdirect\.com/)) {
            return null;
        } else {
            return { 'invalidUrlDomain': true };
        }
    }
}