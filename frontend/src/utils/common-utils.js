import config from "../config/config.js";

export class CommonUtils {
    static operationsType(type) {
        let typeHtml = null;
        switch (type) {
            case config.type.income:
                typeHtml = '<span style="color: green">доход</span>';
                break;
            case config.type.expense:
                typeHtml = '<span style="color: red">расход</span>';
                break;
        }
        return typeHtml;
    }
}