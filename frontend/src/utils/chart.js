var incomeChart;
var expensesChart;

function createIncomeChart() {
    const myIncome = document.getElementById('myIncome');
    const myExpenses = document.getElementById('myExpenses');

    // Если график уже существует, уничтожить его перед созданием нового
    if (incomeChart) {
        incomeChart.destroy();
    }

    // myIncome.style.display = 'block';
    // myExpenses.style.display = 'block';


    incomeChart = new Chart(myIncome, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
            datasets: [{
                label: '# of Votes',
                data: [1, 3, 5, 7],
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
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
            datasets: [{
                label: '# of Votes',
                data: [1, 3, 5, 7, 9, 13],
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

createIncomeChart();



