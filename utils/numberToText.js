export function numberToText(number) {
    const units = [
        '', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'
    ];
    const teens = [
        'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать',
        'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'
    ];
    const tens = [
        '', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят',
        'семьдесят', 'восемьдесят', 'девяносто'
    ];
    const hundreds = [
        '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот',
        'семьсот', 'восемьсот', 'девятьсот'
    ];
    const thousands = [
        '', 'тысяча', 'тысячи', 'тысяч'
    ];

    if (number === 0) return 'ноль рублей';

    let text = '';
    let rubles = Math.floor(number);
    let remainder = number % 1000;

    // Разбиваем число на группы по три цифры
    let rubleParts = [];
    while (rubles > 0) {
        rubleParts.push(rubles % 1000);
        rubles = Math.floor(rubles / 1000);
    }

    for (let i = rubleParts.length - 1; i >= 0; i--) {
        let n = rubleParts[i];

        if (n === 0) continue;

        let hundred = Math.floor(n / 100);
        let ten = Math.floor((n % 100) / 10);
        let unit = n % 10;

        if (hundred > 0) {
            text += hundreds[hundred] + ' ';
        }

        if (ten === 1) {
            text += teens[unit] + ' ';
        } else {
            if (ten > 0) {
                text += tens[ten] + ' ';
            }
            if (unit > 0) {
                // Для тысяч меняем форму единиц
                if (i === 1) {
                    text += (unit === 1 ? 'одна' : unit === 2 ? 'две' : units[unit]) + ' ';
                } else {
                    text += units[unit] + ' ';
                }
            }
        }

        // Добавляем название разряда
        if (i === 1) {
            if (unit === 1 && ten !== 1) {
                text += thousands[1] + ' ';
            } else if ((unit >= 2 && unit <= 4) && ten !== 1) {
                text += thousands[2] + ' ';
            } else {
                text += thousands[3] + ' ';
            }
        }
    }

    // Добавляем слово "рубль" в правильном падеже
    let lastDigit = remainder % 10;
    let lastTwoDigits = remainder % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        text += 'рубль';
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
        text += 'рубля';
    } else {
        text += 'рублей';
    }

    return text.trim();
}


