import {AuthUtils} from "../../utils/auth-utils.js";
import {HttpUtils} from "../../utils/http-utils.js";

export class Login {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        //Если пользователь уже имеет accessToken, т.е он залогинен, то переводим его на главную стр. дашборда
        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }


        this.emailElement = document.getElementById('email');
        this.emailErrorElement = document.getElementById('email-error');
        this.passwordElement = document.getElementById('password');
        this.passwordErrorElement = document.getElementById('password-error');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.login.bind(this));
    }

    validateForm() {
        let isValid = true;


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

        return isValid;
    }


    async login() {
        this.commonErrorElement.style.display = 'none'

        if (this.validateForm()) {
            //request
            const result = await HttpUtils.request('/login', 'POST', false, {
                email: this.emailElement.value,
                password: this.passwordElement.value,
                rememberMe: this.rememberMeElement.checked,
            });


            if (result.response.error || !result.response || (result.response && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user.name || !result.response.user.lastName || !result.response.user.id))) {
                this.commonErrorElement.style.display = 'block';
                return;
            }



            AuthUtils.setAuthInfo(result.response.tokens.accessToken, result.response.tokens.refreshToken, {
                id:result.response.user.id,
                name: result.response.user.name,
                lastName: result.response.user.lastName,
            });

            // Переход на главную страницу-дашборд
            this.openNewRoute('/');

        }
    }
}