import {Dashboard} from "./components/dashboard.js";
import {Login} from "./components/auth/login.js";
import {SignUp} from "./components/auth/sign-up.js";
import {FileUtils} from "./utils/file-utils.js";
import {Logout} from "./components/auth/logout.js";
import {IncomeList} from "./components/income/income-list.js";
import {IncomeDelete} from "./components/income/income-delete.js";
import {IncomeEdit} from "./components/income/income-edit.js";
import {IncomeCreate} from "./components/income/income-create.js";
import {ExpenseList} from "./components/expense/expense-list.js";
import {ExpenseDelete} from "./components/expense/expense-delete.js";
import {ExpenseEdit} from "./components/expense/expense-edit.js";
import {ExpenseCreate} from "./components/expense/expense-create.js";
import {IncomesExpensesList} from "./components/incomes-expenses/incomes-expenses-list.js";
import {IncomesExpensesDelete} from "./components/incomes-expenses/incomes-expenses-delete.js";
import {IncomesExpensesCreate} from "./components/incomes-expenses/incomes-expenses-create.js";
import {IncomesExpensesEdit} from "./components/incomes-expenses/incomes-expenses-edit.js";
import {AuthUtils} from "./utils/auth-utils.js";
import {Balance} from "./components/balance/balance.js";
import {HandleLClickSidebar} from "./utils/handle-click-sidebar.js";


export class Router {
    constructor() {

        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('title');
        this.contentElement = document.getElementById('content');

        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
                styles: ['layout.css', 'income-expenses.css'],
                scripts: ['chart.js', 'sidebars.js'],
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                styles: ['form.css'],
                load: () => {
                    new Login(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                styles: ['form.css'],
                load: () => {
                    new SignUp(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/expense',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expense/expense.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseList(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/expense-create',
                title: 'Создание расхода',
                filePathTemplate: '/templates/pages/expense/expense-create.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseCreate(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/expense-edit',
                title: 'Редактирование расхода',
                filePathTemplate: '/templates/pages/expense/expense-edit.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseEdit(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/expense-delete',
                load: () => {
                    new ExpenseDelete(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/income/income.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeList(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/income-create',
                title: 'Создание дохода',
                filePathTemplate: '/templates/pages/income/income-create.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeCreate(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/income-edit',
                title: 'Редактирование дохода',
                filePathTemplate: '/templates/pages/income/income-edit.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeEdit(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/income-delete',
                load: () => {
                    new IncomeDelete(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/incomes-expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomesExpensesList(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/incomes-expenses-create',
                title: 'Создание доходов/расходов',
                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses-create.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomesExpensesCreate(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/incomes-expenses-edit',
                title: 'Редактирование доходов/расходов',
                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses-edit.html',
                styles: ['layout.css', 'income-expenses.css'],
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomesExpensesEdit(this.openNewRoute.bind(this));
                    new Balance(this.openNewRoute.bind(this));
                    new HandleLClickSidebar();
                },
            },
            {
                route: '/incomes-expenses-delete',
                load: () => {
                    new IncomesExpensesDelete(this.openNewRoute.bind(this));
                },
            },
        ]
    }


    initEvents() {
        //Когда пользователь первый раз загрузил приложение, весь контент на нашей странице загрузился, то вызываем функцию
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        //popstate - это специальное событие, когда URL меняется, когда мы перешли на какую-то другую страницу
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }


    //Функционал async openNewRoute(url) переход на новую страницу!!! ВАЖНО!!! Без перезагрузки всего приложения!!!
    async openNewRoute(url) {
        //const currentRoute - старый url-роут
        const currentRoute = window.location.pathname;
        //history.pushState - новый url-роут
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }


    async clickHandler(e) {
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }

        if (element) {
            e.preventDefault();
            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }

            await this.openNewRoute(url);
        }
    }


    async activateRoute(e, oldRoute = null) {
        if (oldRoute) {
            const currentRoute = this.routes.find(item => {
                return item.route === oldRoute;
            });


            //Удаляем стили в старом роуте при переходе новый роут
            if (currentRoute.styles && currentRoute.styles.length > 0) {
                currentRoute.styles.forEach(style => {
                    //Удаляем нужную строку стилей перед  <link rel="stylesheet" href="/css/adminlte.min.css" id="adminlte_style">
                    document.querySelector(`link[href='/styles/${style}']`).remove();
                });
            }

            //Удаляем скрипты в старом роуте при переходе новый роут
            if (currentRoute.scripts && currentRoute.scripts.length > 0) {
                currentRoute.scripts.forEach(script => {
                    //Удаляем нужную строку скриптов в конце body
                    document.querySelector(`script[src='/js/${script}']`).remove();
                });
            }
        }


        //window.location.pathname этим методом находим что у нас находиться в URL после основного доменного имени/......, для того чтобы дальше понимать какой
        //router у нас открыт "/", "/login","/sign-up"  и тд
        const urlRoute = window.location.pathname;
        //Проходимся по всем роутам и ищем нужный роут исходя из того, какой сейчас у нас URL
        const newRoute = this.routes.find(item => {
            //в pathname у нас будет то, что находится в URL строке после основного доменного имени http://127.0.0.1:8080/pathname, pathname в нашем случае будет "/", "/login","/sign-up" и тд
            return item.route === urlRoute;
        });


        if (newRoute) {
            //Подгружаем заголовки
            if (newRoute.title) {
                //Заголовок страницы будет подгружаться нужный нам в зависимости от страницы
                this.titleElement.innerText = newRoute.title + ' | Lumincoin Finance';
            }

            //Подгружаем HTML-страницы
            if (newRoute.filePathTemplate) {
                let contentBlock = this.contentElement;
                //Подгружаем Layout-страницу, если она используется в роуте
                if (newRoute.useLayout) {
                    this.contentElement.innerHTML =
                        await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');

                    this.activateMenuItem(newRoute);
                }

                contentBlock.innerHTML =
                    await fetch(newRoute.filePathTemplate).then(response => response.text());


                //Подключение стилей
                if (newRoute.styles && newRoute.styles.length > 0) {
                    //Подключение стилей
                    if (newRoute.styles && newRoute.styles.length > 0) {
                        newRoute.styles.forEach(style => {
                            FileUtils.loadPageStyle('/styles/' + style, this.stylesElement);
                        });
                    }
                }


                //Подключение скриптов
                if (newRoute.scripts && newRoute.scripts.length > 0) {
                    for (const script of newRoute.scripts) {
                        FileUtils.loadPageScript('/js/' + script);
                    }
                }
                //Подгружаем имя и фамилию админа в сайдбар
                this.updateUserName();
            }


            if (newRoute.load && typeof newRoute.load === "function") {
                newRoute.load();
            }

        } else {
            //Если открылась не найденная страница, то отправим польз на главную страницу
            history.pushState({}, '', '/');
        }
    }


    //Подгружаем имя и фамилию админа в сайдбар
    updateUserName() {
        this.profileNameElement = document.getElementById('profile-name');
        if (this.profileNameElement) {
            this.userName = null; // Очищаем старое имя
            let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey);
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
                if (userInfo && userInfo.name) {
                    this.userName = userInfo.name;
                }
            }
            this.profileNameElement.innerText = this.userName || ''; // Обновляем имя в элементе
        }
    }


    //Функция активации пунктов меню
    activateMenuItem(route) {
        let buttonCategoryElement = document.getElementById('button-category');
        let dropdownMenuElement = document.getElementById('dropdown-menu');
        let dropdownActionElement = document.getElementById('dropdown-action');

        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
            const href = item.getAttribute('href');

            if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        })

        buttonCategoryElement.onclick = () => {
            document.querySelectorAll('.sidebar .nav-link').forEach(item => {
                const href = item.getAttribute('href');
                item.classList.remove('active');
            });
            const isActive = buttonCategoryElement.classList.toggle('active');
            dropdownMenuElement.style.display = isActive ? 'block' : 'none';
            dropdownActionElement.classList.toggle('active');
        };

        document.querySelectorAll('.dropdown-item').forEach(item => {
            const href = item.getAttribute('href');

            if ((route.route === '/expense' && (href === '/expense')) || (route.route === '/income' && (href === '/income'))) {
                item.classList.add('active');
                dropdownMenuElement.style.display = 'block';
                buttonCategoryElement.classList.toggle('active');
                dropdownActionElement.classList.toggle('active');
            }
        })
    }
}

