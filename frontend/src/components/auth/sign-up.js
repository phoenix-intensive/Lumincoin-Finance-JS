import {HttpUtils} from "../../utils/http-utils.js";

export class SignUp {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;


        this.nameElement = document.getElementById('name');
        this.nameErrorElement = document.getElementById('name-error');
        this.lastNameElement = document.getElementById('last-name');
        this.lastNameErrorElement = document.getElementById('last-name-error');
        this.emailElement = document.getElementById('email');
        this.emailErrorElement = document.getElementById('email-error');
        this.passwordElement = document.getElementById('password');
        this.passwordErrorElement = document.getElementById('password-error');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.passwordRepeatErrorElement = document.getElementById('password-repeat-error');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this));
    }

    validateForm() {
        let isValid = true;

        if (this.nameElement.value && this.nameElement.value.match(/^[А-ЯЁ][а-яё]+$/)) {
            this.nameErrorElement.style.display = 'none';
        } else {
            this.nameErrorElement.style.display = 'block';
            isValid = false;
        }

        if (this.lastNameElement.value && this.lastNameElement.value.match(/^[А-ЯЁ][а-яё]+$/)) {
            this.lastNameErrorElement.style.display = 'none';
        } else {
            this.lastNameErrorElement.style.display = 'block';
            isValid = false;
        }
        if (this.emailElement.value && this.emailElement.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            this.emailErrorElement.style.display = 'none';
        } else {
            this.emailErrorElement.style.display = 'block';
            isValid = false;
        }

        if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            this.passwordErrorElement.style.display = 'none';
        } else {
            this.passwordErrorElement.style.display = 'block';
            isValid = false;
        }

        if (this.passwordRepeatElement.value && this.passwordRepeatElement.value === this.passwordElement.value) {
            this.passwordRepeatErrorElement.style.display = 'none';
        } else {
            this.passwordRepeatErrorElement.style.display = 'block';
            isValid = false;
        }

        return isValid;
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none'

        if (this.validateForm()) {
            //request
            const result = await HttpUtils.request('/signup', 'POST', false, {
                name: this.nameElement.value,
                lastName: this.lastNameElement.value,
                email: this.emailElement.value,
                password: this.passwordElement.value,
                passwordRepeat: this.passwordRepeatElement.value,
            });


            if (result.response.error || !result.response || (result.response && (!result.response.user.name || !result.response.user.lastName || !result.response.user.email || !result.response.user.id))) {
                this.commonErrorElement.style.display = 'block';
                return;
            }


            // Переход на страницу-логина для дальнейшего входа в систему и для получения accessToken и refreshToken согласно ответу бекенда
            //тк со страницы регистрации accessToken и refreshToken мы не получаем от бекенда, а получаем их только после логина
            this.openNewRoute('/login');

        }
    }
}