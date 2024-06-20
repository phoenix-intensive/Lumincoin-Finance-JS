import {HttpUtils} from "../../utils/http-utils.js";
import {UrlUtils} from "../../utils/url-utils.js";

export class ExpenseDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        //Достаем id пользователя из url адреса
        const id = UrlUtils.getUrlParam('id');

        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteExpense(id).then();
    }


    async deleteExpense(id) {
        //request
        const result = await HttpUtils.request('/categories/expense/' + id, 'DELETE', true);

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }


        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при удалении категории расхода');
        }

        return this.openNewRoute('/expense');
    }
}