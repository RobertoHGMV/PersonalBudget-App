export class DateHelper {

    static formatDate(date: Date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let newDay = day < 10 ? `0${day}` : day;
        let newMonth = month < 10 ? `0${month}` : month;

        let formatedDate = year + '-' + newMonth + '-' + newDay;

        return formatedDate;
    }

    static getCurrentDate() {
        return this.formatDate(new Date());
    }

    static getCurrentDay() {
        let newDate = new Date();
        let day = newDate.getDate();

        return day < 10 ? `0${day}` : day;
    }

    static getCurrentMonth() {
        let newDate = new Date();
        let month = newDate.getMonth() + 1;

        return month < 10 ? `0${month}` : month;
    }

    static getLastDayOfMonth(year, month) {
        return (new Date(year, month, 0)).getDate();
    }

    static getFirstDate() {
        let date = new Date();
        date.setDate(1);
        return this.formatDate(date);
    }

    static getLastDate() {
        let date = new Date();
        let lastDayOfMonth = this.getLastDayOfMonth(date.getFullYear(), date.getMonth() + 1);
        date.setDate(lastDayOfMonth);
        return this.formatDate(date);
    }
}