import {HttpUtils} from "../../utils/http-utils.js";

export class IncomeList {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        this.getIncomes().then();
    }

    async getIncomes() {
        const result = await HttpUtils.request('/categories/income');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response) {
            return alert('Возникла ошибка при запросе категорий доходов');
        }

        let incomes = result.response;

        this.showIncomes(incomes);
    }

    showIncomes(incomes) {
        const incomesElement = document.getElementById('incomes');
        const popupContainer = document.getElementById('popup');
        const confirmDeleteButton = document.getElementById('confirmDeleteButton');
        const cancelDeleteButton = document.getElementById('cancelDeleteButton');
        let deleteUrl = ''; // Хранит URL для удаления

        // Создаем блоки для каждого дохода
        incomes.forEach(income => {
            // Создаем элемент для категории дохода
            const incomeElement = document.createElement('div');
            incomeElement.className = 'categories-block';

            // Создаем заголовок с названием категории
            const incomeTitle = document.createElement('h3');
            incomeTitle.innerText = income.title;

            // Создаем кнопку редактирования
            const editButton = document.createElement('a');
            editButton.href = `/income-edit?id=${income.id}`;
            editButton.className = 'btn-edit';
            editButton.textContent = 'Редактировать';

            // Создаем кнопку удаления
            const deleteButton = document.createElement('a');
            deleteButton.className = 'btn-delete';
            deleteButton.textContent = 'Удалить';

            // Добавляем обработчик клика
            deleteButton.addEventListener('click', (event) => {
                event.preventDefault();
                deleteUrl = `/income-delete?id=${income.id}`; // Обновляем URL
                confirmDeleteButton.href = deleteUrl; // Устанавливаем href на кнопку подтверждения
                popupContainer.style.display = 'block'; // Показываем popup
            });

            // Добавляем обработчик клика
            cancelDeleteButton.addEventListener('click', (event) => {
                event.preventDefault();
                popupContainer.style.display = 'none';
            });


            // Добавляем элементы внутрь блока категории
            incomeElement.appendChild(incomeTitle);
            incomeElement.appendChild(editButton);
            incomeElement.appendChild(deleteButton);

            // Добавляем блок категории внутрь элемента доходов
            incomesElement.appendChild(incomeElement);
        });

        // Создаем блок для создания нового дохода
        const addNewElement = document.createElement('a');
        addNewElement.href = '/income-create';
        addNewElement.innerHTML = '<div class="categories-block add-new"><span>+</span></div>';

        // Добавляем блок создания нового дохода в конец списка категорий
        incomesElement.appendChild(addNewElement);
    }
}