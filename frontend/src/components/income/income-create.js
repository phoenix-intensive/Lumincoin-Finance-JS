import {HttpUtils} from "../../utils/http-utils";


export class IncomeCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('createButton').addEventListener('click', this.createIncome.bind(this));

        this.incomeCreateInputElement = document.getElementById('incomeCreateInput');
        this.incomeCreateErrorElement = document.getElementById('income-create-error');
    }

    validateForm() {
        let isValid = true;

        if (this.incomeCreateInputElement.value) {
            this.incomeCreateErrorElement.style.display = 'none';
        } else {
            this.incomeCreateErrorElement.style.display = 'block';
            isValid = false;
        }
        return isValid;
    }

    async createIncome(e) {
        e.preventDefault();

        if (this.validateForm()) {

            const createData = {
                title: this.incomeCreateInputElement.value,
            };

            //request
            const result = await HttpUtils.request('/categories/income', 'POST', true, createData);

            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при создании категории дохода');
            }

            return this.openNewRoute('/income')
        }
    }
}