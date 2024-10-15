import {HttpUtils} from "../../utils/http-utils.js";


export class IncomesExpensesCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.typeSelectElement = document.getElementById('typeSelect');
        this.categorySelectElement = document.getElementById('categorySelect');
        this.amountInputElement = document.getElementById('amountInput');
        this.dateInputElement = document.getElementById('dateInput');
        this.commentInputElement = document.getElementById('commentInput');
        this.amountErrorElement = document.getElementById('amountError');
        this.dateErrorElement = document.getElementById('dateError');
        this.commentErrorElement = document.getElementById('commentError');

        this.getCategories('income').then();

        this.typeSelectElement.addEventListener('change', this.onTypeChange.bind(this));
        document.getElementById('createButton').addEventListener('click', this.saveIncomesExpenses.bind(this));
    }

    async onTypeChange() {
        const selectedType = this.typeSelectElement.value;
        if (selectedType === 'income') {
            await this.getCategories('income');
        } else if (selectedType === 'expense') {
            await this.getCategories('expense');
        }
    }

    async getCategories(type) {
        const result = await HttpUtils.request(`/categories/${type}`);

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response) {
            return alert(`Возникла ошибка при запросе категорий ${type === 'income' ? 'доходов' : 'расходов'}`);
        }

        this.categorySelectElement.innerHTML = ''; // Очищаем предыдущие опции

        const categories = result.response;
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.innerText = category.title;
            this.categorySelectElement.appendChild(option);
        });
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

    async saveIncomesExpenses(e) {
        e.preventDefault();

        if (this.validateForm()) {

            const createData = {
                type: this.typeSelectElement.value,
                amount: parseInt(this.amountInputElement.value),
                date: this.dateInputElement.value,
                category_id: Number(this.categorySelectElement.value),
                comment: this.commentInputElement.value,
            };

            //request
            const result = await HttpUtils.request('/operations', 'POST', true, createData);

            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }


            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при создании расхода/дохода');
            }

            return this.openNewRoute('/incomes-expenses');

        }
    }
}