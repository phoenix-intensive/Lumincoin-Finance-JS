import {HttpUtils} from "../../utils/http-utils.js";
import {UrlUtils} from "../../utils/url-utils.js";

export class IncomesExpensesDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        //Достаем id пользователя из url адреса
        const id = UrlUtils.getUrlParam('id');

        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteIncomesExpenses(id).then();
    }


    async deleteIncomesExpenses(id) {
        //request
        const result = await HttpUtils.request('/operations/' + id, 'DELETE', true);

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }


        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при удалении операции');
        }

        return this.openNewRoute('/incomes-expenses');
    }
}