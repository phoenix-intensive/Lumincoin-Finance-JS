export class FileUtils {

    //Подключения скриптов
    static loadPageScript(src) {
            const script = document.createElement('script');
            script.src = src;
            //Добавляем нужную строку скриптов в конец body пример: <script src="../../plugins/datatables/jquery.dataTables.min.js"></script>
            document.body.appendChild(script);
    }


    //Так же сделаем для подключения стилей
    static loadPageStyle(src, insertBeforeElement) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = src;
        //Добавляем нужную строку стилей в head перед  <link rel="stylesheet" href="/css/adminlte.min.css" id="adminlte_style">
        document.head.insertBefore(link, insertBeforeElement);
    }
}