import {HttpUtils} from "../../utils/http-utils.js";
import {UrlUtils} from "../../utils/url-utils.js";

export class IncomesExpensesEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        //Достаем id пользователя из url адреса
        const id = UrlUtils.getUrlParam('id');

        if (!id) {
            return this.openNewRoute('/');
        }

        this.typeSelectElement = document.getElementById('typeSelect');
        this.categorySelectElement = document.getElementById('categorySelect');
        this.amountInputElement = document.getElementById('amountInput');
        this.dateInputElement = document.getElementById('dateInput');
        this.commentInputElement = document.getElementById('commentInput');
        this.amountErrorElement = document.getElementById('amountError');
        this.dateErrorElement = document.getElementById('dateError');
        this.commentErrorElement = document.getElementById('commentError');


        document.getElementById('updateButton').addEventListener('click', this.updateIncomesExpenses.bind(this));

        this.init(id).then();
    }


    async init(id) {
        const orderData = await this.getIncomesExpenses(id);
        if (orderData) {
            this.showInfo(orderData);
            await this.updateCategories(orderData.type, orderData.category);
        }
    }

    async updateCategories(type, category) {
        if (type === 'income') {
            await this.getIncomesCategory(category);
        } else if (type === 'expense') {
            await this.getExpensesCategory(category);
        }
    }

    async getIncomesExpenses(id) {
        const result = await HttpUtils.request('/operations/' + id);

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при запросе доходов/расходов');
        }

        // incomesExpensesOriginalData - изначальные данные доходов/расходов
        this.incomesExpensesOriginalData = result.response;
        return result.response;
    }


    async getIncomesCategory(currentCategoryId) {
        const result = await HttpUtils.request('/categories/income');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при запросе доходов');
        }

        this.CategorySelect(result.response, currentCategoryId);
    }


    async getExpensesCategory(currentCategoryId) {
        const result = await HttpUtils.request('/categories/expense');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при запросе расходов');
        }

        this.CategorySelect(result.response, currentCategoryId);
    }


    CategorySelect(categories, currentCategoryId) {
        this.categorySelectElement.innerHTML = ''; // Очищаем предыдущие опции

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.innerText = category.title;
            if (currentCategoryId === category.title) {
                option.selected = true;
            }
            this.categorySelectElement.appendChild(option);
        });
    }


    showInfo(info) {
        // Подгружаем инфу в ИНПУТЫ
        this.typeSelectElement.value = info.type;
        this.amountInputElement.value = info.amount;
        this.dateInputElement.value = info.date;
        this.commentInputElement.value = info.comment;
    }

    validateForm() {
        let isValid = true;

        if (this.amountInputElement.value) {
            this.amountErrorElement.style.display = 'none';
        } else {
            this.amountErrorElement.style.display = 'block';
            isValid = false;
        }

        if (this.dateInputElement.value) {
            this.dateErrorElement.style.display = 'none';
        } else {
            this.dateErrorElement.style.display = 'block';
            isValid = false;
        }

        if (this.commentInputElement.value) {
            this.commentErrorElement.style.display = 'none';
        } else {
            this.commentErrorElement.style.display = 'block';
            isValid = false;
        }

        return isValid;
    }


    async updateIncomesExpenses(e) {
        e.preventDefault();

        if (this.validateForm()) {

            //Отредактированные данные доходов/расходов
            const changedData = {};
            console.log(changedData)
            if (((this.typeSelectElement.value !== this.incomesExpensesOriginalData.type)) || ((this.typeSelectElement.value === this.incomesExpensesOriginalData.type))) {
                changedData.type = this.typeSelectElement.value;
            }
            if (((Number(this.categorySelectElement.value) !== this.incomesExpensesOriginalData.category_id)) || ((Number(this.categorySelectElement.value) === this.incomesExpensesOriginalData.category_id))) {
                changedData.category_id = Number(this.categorySelectElement.value);
            }
            //Поле суммы дохода/расхода
            if ((parseInt(this.amountInputElement.value) !== parseInt(this.incomesExpensesOriginalData.amount)) || (parseInt(this.amountInputElement.value) === parseInt(this.incomesExpensesOriginalData.amount))) {
                changedData.amount = parseInt(this.amountInputElement.value);
            }
            //Поле даты дохода/расхода
            if (((this.dateInputElement.value !== this.incomesExpensesOriginalData.date)) || ((this.dateInputElement.value === this.incomesExpensesOriginalData.date))) {
                changedData.date = this.dateInputElement.value;
            }
            //Поле комментария дохода/расхода
            if (((this.commentInputElement.value !== this.incomesExpensesOriginalData.comment)) || ((this.commentInputElement.value === this.incomesExpensesOriginalData.comment))) {
                changedData.comment = this.commentInputElement.value;
            }

            //Object.keys(changedData) - проверит по ключам есть ли в объекте поля name, lastName ид, то есть проверка
            //что у нас объект не пустой!!! и только тогда отправляем запрос с изменениями на бэкенд!!!

            if (Object.keys(changedData).length > 0) {
                //request
                const result = await HttpUtils.request('/operations/' + this.incomesExpensesOriginalData.id, 'PUT', true, changedData);

                if (result.redirect) {
                    return this.openNewRoute(result.redirect);
                }


                if (result.error || !result.response || (result.response && result.response.error)) {
                    return alert('Возникла ошибка при редактировании данных дохода/расхода');
                }

                return this.openNewRoute('/incomes-expenses');
            }
        }
    }
}
