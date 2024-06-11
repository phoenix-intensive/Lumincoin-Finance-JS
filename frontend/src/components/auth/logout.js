import {AuthUtils} from "../../utils/auth-utils.js";
import {HttpUtils} from "../../utils/http-utils.js";

export class Logout {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        //Если у пользователя нет accessToken, т.е он не зареган, то переводим его на главную стр. логина
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.logout().then();
    }


    async logout() {
        //request
        await HttpUtils.request('/logout', 'POST', false, {
            refreshToken: AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey),
        });

        //При разлогине удаляем данные из localStorage
        AuthUtils.removeAuthInfo();

        //Переход на страницу логина
        this.openNewRoute('/login');
    }
}