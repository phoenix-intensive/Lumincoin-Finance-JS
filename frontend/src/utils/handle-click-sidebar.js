export class HandleLClickSidebar {

    constructor() {

        this.burgerIcon = document.getElementById('burger-icon');
        this.sidebar = document.getElementById('sidebar');

        this.handleClickSideBar();
    }

    handleClickSideBar() {
        this.burgerIcon.addEventListener('click', () => {
            this.sidebar.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            // Проверяем, что клик был выполнен вне .sidebar и не на .burger-icon
            if (!this.sidebar.contains(e.target) && e.target !== this.burgerIcon) {
                this.sidebar.classList.remove('active');
            }
        });
    }
}