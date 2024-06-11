import {AuthUtils} from "../utils/auth-utils";

export class Dashboard {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        //Если пользователь не имеет accessToken, т.е он не залогинен, то переводим его на стр. логин
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
    }
}