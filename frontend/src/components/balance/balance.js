import {HttpUtils} from "../../utils/http-utils.js";

export class Balance {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        this.getBalance().then();
    }

    async getBalance() {
        const result = await HttpUtils.request('/balance');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе баланса');
        }

        let balances = result.response;
        this.showBalance(balances);
    }


    showBalance(balances) {
        const balanceElement = document.getElementById('balance');
        const balanceAmountElement = balanceElement.querySelector('.fw-bold');

        // Очищаем существующий баланс
        balanceAmountElement.innerText = '';

        // Проходимся по каждому полю объекта balances
        for (let key in balances) {
            // Создаем элемент для суммы баланса
            const balanceAmount = document.createElement('span');
            balanceAmount.className = 'fw-bold';
            balanceAmount.innerText = `${balances.balance}$`;
            balanceAmountElement.appendChild(balanceAmount);
        }
    }
}