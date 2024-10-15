import {HttpUtils} from "../../utils/http-utils.js";

export class ExpenseList {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        this.getExpenses().then();
    }

    async getExpenses() {
        const result = await HttpUtils.request('/categories/expense');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }


        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе категорий расходов');
        }

        let expenses = result.response;

        this.showExpenses(expenses);
    }

    showExpenses(expenses) {
        const expensesElement = document.getElementById('expenses');
        const popupContainer = document.getElementById('popup');
        const confirmDeleteButton = document.getElementById('confirmDeleteButton');
        const cancelDeleteButton = document.getElementById('cancelDeleteButton');
        let deleteUrl = ''; // Хранит URL для удаления

        // Создаем блоки для каждого расхода
        expenses.forEach(expense => {
            // Создаем элемент для категории дохода
            const expenseElement = document.createElement('div');
            expenseElement.className = 'categories-block';

            // Создаем заголовок с названием категории
            const expenseTitle = document.createElement('h3');
            expenseTitle.innerText = expense.title;

            // Создаем кнопку редактирования
            const editButton = document.createElement('a');
            editButton.href = `/expense-edit?id=${expense.id}`;
            editButton.className = 'btn-edit';
            editButton.textContent = 'Редактировать';

            // Создаем кнопку удаления
            const deleteButton = document.createElement('a');
            deleteButton.className = 'btn-delete';
            deleteButton.textContent = 'Удалить';

            // Добавляем обработчик клика
            deleteButton.addEventListener('click', (event) => {
                event.preventDefault();
                deleteUrl = `/expense-delete?id=${expense.id}`; // Обновляем URL
                confirmDeleteButton.href = deleteUrl; // Устанавливаем href на кнопку подтверждения
                popupContainer.style.display = 'block'; // Показываем popup
            });

            // Добавляем обработчик клика
            cancelDeleteButton.addEventListener('click', (event) => {
                event.preventDefault();
                popupContainer.style.display = 'none';
            });

            // Добавляем элементы внутрь блока категории
            expenseElement.appendChild(expenseTitle);
            expenseElement.appendChild(editButton);
            expenseElement.appendChild(deleteButton);

            // Добавляем блок категории внутрь элемента доходов
            expensesElement.appendChild(expenseElement);
        });

        // Создаем блок для создания нового расхода
        const addNewElement = document.createElement('a');
        addNewElement.href = '/expense-create';
        addNewElement.innerHTML = '<div class="categories-block add-new"><span>+</span></div>';

        // Добавляем блок создания нового расхода в конец списка категорий
        expensesElement.appendChild(addNewElement);
    }
}