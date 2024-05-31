
const myIncome = document.getElementById('myIncome');
const myExpenses = document.getElementById('myExpenses');

new Chart(myIncome, {
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

new Chart(myExpenses, {
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
