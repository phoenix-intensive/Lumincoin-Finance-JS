import {HttpUtils} from "../../utils/http-utils.js";
import {UrlUtils} from "../../utils/url-utils.js";


export class ExpenseEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        //Достаем id пользователя из url адреса
        const id = UrlUtils.getUrlParam('id');

        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('updateButton').addEventListener('click', this.updateExpense.bind(this));

        this.expenseEditInputElement = document.getElementById('expenseEditInput');

        this.init(id).then();
    }


    async init(id) {
        const expenseData = await this.getExpense(id);
        if (expenseData) {
            this.showExpense(expenseData);
        }
    }


    async getExpense(id) {
        const result = await HttpUtils.request('/categories/expense/' + id);

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе дохода');
        }

        // expenseOriginalData - изначальные данные расхода
        this.expenseOriginalData = result.response;
        return result.response;
    }


    showExpense(expense) {
        //Подгружаем инфу в ИНПУТ - категорию расхода
        this.expenseEditInputElement.value = this.expenseOriginalData.title;
    }


    async updateExpense(e) {
        e.preventDefault();

        //В changedData объекте находятся отредактированные данные расхода
        const changedData = {};

        //Поле категории расхода
        if (this.expenseEditInputElement.value !== this.expenseOriginalData.title) {
            changedData.title = this.expenseEditInputElement.value;
        }

        //Object.keys(changedData) - проверит по ключам есть ли в объекте поле c категорией расхода, то есть проверка
        //что у нас объект не пустой!!! и только тогда отправляем запрос с изменениями на бэкенд!!!

        if (Object.keys(changedData).length > 0) {
            //request
            const result = await HttpUtils.request('/categories/expense/' + this.expenseOriginalData.id, 'PUT', true, changedData);

            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || !result.response || (result.response && result.response.error)) {
                console.log(result.response.message)
                return alert('Возникла ошибка при изменении данных категории расхода');
            }

            return this.openNewRoute('/expense');
        }
    }
}