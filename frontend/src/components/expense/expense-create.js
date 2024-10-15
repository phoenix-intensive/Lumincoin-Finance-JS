import {HttpUtils} from "../../utils/http-utils.js";


export class ExpenseCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('createButton').addEventListener('click', this.createExpense.bind(this));

        this.expenseCreateInputElement = document.getElementById('expenseCreateInput');
        this.expenseCreateErrorElement = document.getElementById('expense-create-error');
    }

    validateForm() {
        let isValid = true;

        if (this.expenseCreateInputElement.value) {
            this.expenseCreateErrorElement.style.display = 'none';
        } else {
            this.expenseCreateErrorElement.style.display = 'block';
            isValid = false;
        }
        return isValid;
    }

    async createExpense(e) {
        e.preventDefault();

        if (this.validateForm()) {

            const createData = {
                title: this.expenseCreateInputElement.value,
            };


            //request
            const result = await HttpUtils.request('/categories/expense', 'POST', true, createData);

            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }


            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при создании категории расхода');
            }

            return this.openNewRoute('/expense')

        }
    }
}