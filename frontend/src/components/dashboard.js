import {AuthUtils} from "../utils/auth-utils";
import {HttpUtils} from "../utils/http-utils";

var incomeChart;
var expensesChart;


function createCharts(incomeData, incomeLabels, expenseData, expenseLabels) {
    const myIncome = document.getElementById('myIncome');
    const myExpenses = document.getElementById('myExpenses');

    if (incomeChart) {
        incomeChart.destroy();
    }
    if (expensesChart) {
        expensesChart.destroy();
    }

    incomeChart = new Chart(myIncome, {
        type: 'pie',
        data: {
            labels: incomeLabels,
            datasets: [{
                label: 'Доходы',
                data: incomeData,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        },
    });

    expensesChart = new Chart(myExpenses, {
        type: 'pie',
        data: {
            labels: expenseLabels,
            datasets: [{
                label: 'Расходы',
                data: expenseData,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        },
    });
}


export class Dashboard {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        //Если пользователь не имеет accessToken, т.е он не залогинен, то переводим его на стр. логин
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.filterButtons = document.querySelectorAll('.btn-filter');
        this.startDateInput = document.getElementById('dateFrom');
        this.endDateInput = document.getElementById('dateTo');
        this.intervalErrorElement = document.getElementById('interval-error');

        this.handleFilterButtonClick();
    }



    handleFilterButtonClick(e) {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterButton(e);
            });
        });
    }


    handleFilterButton(e) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
            this.intervalErrorElement.style.display = 'none';
        });
        e.currentTarget.classList.add('active');


        //Функция очищения инпутов дат после нажатия на следующую кнопку фильтра исключая кнопку фильтра интервал
        if (e.currentTarget.id !== 'filter-interval') {
            if (this.startDateInput.value && this.endDateInput.value) {
                this.clearDateInputs();
            }
        }


        const filterType = e.currentTarget.id;
        switch (filterType) {
            case 'filter-today':
                this.getOperationsDay().then();
                break;
            case 'filter-week':
                this.getOperationsWeek().then();
                break;
            case 'filter-month':
                this.getOperationsMonth().then();
                break;
            case 'filter-year':
                this.getOperationsYear().then();
                break;
            case 'filter-all':
                this.getOperationsAll().then();
                break;
            case 'filter-interval':
                this.getOperationsByInterval().then();
                break;
            default:
                break;
        }
    }


    clearDateInputs() {
        this.startDateInput.value = '';
        this.endDateInput.value = '';
    }

    async getOperationsDay() {
        const result = await HttpUtils.request('/operations?period=day');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе операций доходов/расходов');
        }
        let operations = result.response;
        this.updateCharts(operations);
    }

    async getOperationsWeek() {
        const result = await HttpUtils.request('/operations?period=week');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе операций доходов/расходов');
        }
        let operations = result.response;
        this.updateCharts(operations);

    }

    async getOperationsMonth() {
        const result = await HttpUtils.request('/operations?period=month');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе операций доходов/расходов');
        }
        let operations = result.response;
        this.updateCharts(operations);
    }

    async getOperationsYear() {
        const result = await HttpUtils.request('/operations?period=year');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе операций доходов/расходов');
        }
        let operations = result.response;
        this.updateCharts(operations);
    }

    async getOperationsAll() {
        const result = await HttpUtils.request('/operations?period=all');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе операций доходов/расходов');
        }
        let operations = result.response;
        this.updateCharts(operations);
    }

    async getOperationsByInterval() {
        if (this.startDateInput.value && this.endDateInput.value) {
            this.intervalErrorElement.style.display = 'none';
        } else {
            this.intervalErrorElement.style.display = 'block';
            return;
        }

        const result = await HttpUtils.request(`/operations?period=interval&dateFrom=${this.startDateInput.value}&dateTo=${this.endDateInput.value}`);

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе операций доходов/расходов');
        }
        let operations = result.response;
        this.updateCharts(operations);
    }


    //Функция используется для обновления графиков на основе данных операций.
    updateCharts(operations) {
        const groupedIncome = this.groupByCategory(operations.filter(op => op.type === 'income'));
        const groupedExpenses = this.groupByCategory(operations.filter(op => op.type === 'expense'));
        const incomeData = Object.values(groupedIncome);
        const incomeLabels = Object.keys(groupedIncome);
        const expenseData = Object.values(groupedExpenses);
        const expenseLabels = Object.keys(groupedExpenses);

        createCharts(incomeData, incomeLabels, expenseData, expenseLabels);
    }


    //Функция используется для группировки операций по категориям и добавления туда сумм
    groupByCategory(operations) {
        const grouped = {};

        for (const op of operations) {
            if (!grouped[op.category]) {
                grouped[op.category] = 0;
            }
            grouped[op.category] += op.amount;
        }
        return grouped;
    }
}
