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
