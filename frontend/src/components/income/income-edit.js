import {HttpUtils} from "../../utils/http-utils.js";
import {UrlUtils} from "../../utils/url-utils.js";


export class IncomeEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        //Достаем id пользователя из url адреса
        const id = UrlUtils.getUrlParam('id');

        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('updateButton').addEventListener('click', this.updateIncome.bind(this));

        this.incomeEditInputElement = document.getElementById('incomeEditInput');

        this.init(id).then();
    }


    async init(id) {
        const incomeData = await this.getIncome(id);
        if (incomeData) {
            this.showIncome(incomeData);
        }
    }


    async getIncome(id) {
        const result = await HttpUtils.request('/categories/income/' + id);

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе дохода');
        }


        // incomeOriginalData - изначальные данные дохода
        this.incomeOriginalData = result.response;
        return result.response;

    }


    showIncome(income) {
        //Подгружаем инфу в ИНПУТ - категорию дохода
        this.incomeEditInputElement.value = this.incomeOriginalData.title;
    }


    async updateIncome(e) {
        e.preventDefault();

        //В changedData объекте находятся отредактированные данные дохода
        const changedData = {};

        //Поле категории дохода
        if (this.incomeEditInputElement.value !== this.incomeOriginalData.title) {
            changedData.title = this.incomeEditInputElement.value;
        }

        //Object.keys(changedData) - проверит по ключам есть ли в объекте поле c категорией дохода, то есть проверка
        //что у нас объект не пустой!!! и только тогда отправляем запрос с изменениями на бэкенд!!!

        if (Object.keys(changedData).length > 0) {
            //request
            const result = await HttpUtils.request('/categories/income/' + this.incomeOriginalData.id, 'PUT', true, changedData);

            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || !result.response || (result.response && result.response.error)) {
                console.log(result.response.message)
                return alert('Возникла ошибка при изменении данных категории дохода');
            }

            return this.openNewRoute('/income');
        }
    }
}