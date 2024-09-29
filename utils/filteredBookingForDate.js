// Функция для преобразования строки даты в объект Date
function parseDate(dateString) {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
}

// Функция для фильтрации данных по текущему месяцу
export function filterCurrentMonth(data) {
    const now = new Date();
    console.log("data",data);
    return data.filter(item => {
        const d = parseDate(item.date);
        console.log("date",d);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
}

// Функция для фильтрации данных по прошлому месяцу
export function filterLastMonth(data) {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    return data.filter(item => {
        const d = parseDate(item.date);
        return d.getFullYear() === lastMonth.getFullYear() && d.getMonth() === lastMonth.getMonth();
    });
}

// Функция для фильтрации данных за текущий год
export function filterCurrentYear(data) {
    const now = new Date();
    return data.filter(item => {
        const d = parseDate(item.date);
        return d.getFullYear() === now.getFullYear();
    });
}

// Функция для фильтрации данных за прошлый год
export function filterLastYear(data) {
    const now = new Date();
    return data.filter(item => {
        const d = parseDate(item.date);
        return d.getFullYear() === now.getFullYear() - 1;
    });
}
