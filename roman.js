const romanToDec = (string) => {
    let sum = 0;

    const add = (num) => sum += num;

    const terminalList = [
        "M", "MM", "MMM", "CD", "D", "CM", "C", "CC", "CCC",
        "XL", "L", "XC", "X", "XX", "XXX", "IV", "V", "IX",
        "I", "II", "III"
    ];

    let i = 0;
    const input = string.toUpperCase();
    const readNextTerminal = () => {
        let buffer = "";

        do {
            if (input[i]) {
                buffer += input[i];
                i += 1;
            } else {
                return
            }

            if (terminalList.indexOf(buffer + input[i]) === -1) {
                break;
            }
        } while (true);

        return buffer;
    };

    const match = (t) => {
        if (lookahed == t) {
            lookahed = readNextTerminal();
        } else throw new Error("Syntax error.");
    }

    const roman = () => {
        thousand();
        hundred();
        ten();
        digit();
        return sum
    }

    const thousand = () => {
        switch (lookahed) {
            case "M":
                {
                    match("M");add(1000);
                    break;
                }
            case "MM":
                {
                    match("MM");add(2000);
                    break;
                }
            case "MMM":
                {
                    match("MMM");add(3000);
                    break;
                }
            default:
                return;
        }
    }

    const hundred = () => {
        switch (lookahed) {
            case "CD":
                {
                    match("CD");add(400);
                    break;
                }
            case "D":
                {
                    match("D");add(500);smallHundred();
                    break;
                }
            case "CM":
                {
                    match("CM");add(900);
                    break;
                }
            default:
                smallHundred();
        }
    };

    const smallHundred = () => {
        switch (lookahed) {
            case "C":
                {
                    match("C");add(100);
                    break;
                }
            case "CC":
                {
                    match("CC");add(200);
                    break;
                }
            case "CCC":
                {
                    match("CCC");add(300);
                    break;
                }
            default:
                return;
        }
    }

    const ten = () => {
        switch (lookahed) {
            case "XL":
                {
                    match("XL");add(40);
                    break;
                }
            case "L":
                {
                    match("L");add(50);smallTen();
                    break;
                }
            case "XC":
                {
                    match("XC");add(90);
                    break;
                }
            default:
                smallTen();
        }
    }

    const smallTen = () => {
        switch (lookahed) {
            case "X":
                {
                    match("X");add(10);
                    break;
                }
            case "XX":
                {
                    match("XX");add(20);
                    break;
                }
            case "XXX":
                {
                    match("XXX");add(30);
                    break;
                }
            default:
                return;
        }

    }

    const digit = () => {
        switch (lookahed) {
            case "IV":
                {
                    match("IV");add(4);
                    break;
                }
            case "V":
                {
                    match("V");add(5);smallDigit();
                    break;
                }
            case "IX":
                {
                    match("IX");add(9);
                    break;
                }
            default:
                smallDigit();
        };
    }

    const smallDigit = () => {
        switch (lookahed) {
            case "I":
                {
                    match("I");add(1);
                    break;
                }
            case "II":
                {
                    match("II");add(2);
                    break;
                }
            case "III":
                {
                    match("III");add(3);
                    break;
                }
            default:
                return;
        }
    }
    let lookahed = readNextTerminal(); //initializing;

    let value = roman();
    let error = null;

    if (lookahed != undefined) {

        if (terminalList.indexOf(lookahed) !== -1) {
            return Promise.reject({
                msg: "Помилка: невірний запис римських чисел",
                position: i - 1
            });
        } else {
            return Promise.reject({
                msg: "Помилка: недопустимий символ",
                position: i - 1
            });
        }
    } else {
        return Promise.resolve(value);
    }
}

const decToRoman = (string) => {
    const arab = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    const roman = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];

    let number = parseInt(string);

    if (Number.isNaN(number)) {
        return Promise.reject({
            msg: "Помилка: невірно записане число",
            position: 0
        })
    } else if (number.toString().length !== string.length) {
        return Promise.reject({
            msg: "Помилка: невірно записане число",
            position: 0
        })
    } else if (number < 0) {
        return Promise.reject({
            msg: "Помилка: число повинне бути більше 0",
            position: 0
        })
    } else if (number > 3999) {
        return Promise.reject({
            msg: "Помилка: число повинне бути менше 4000",
            position: 0
        })
    }

    let i = arab.length;
    let result = "";

    while (number > 0) {
        if (arab[i] <= number) {
            number -= arab[i];
            result += roman[i];
        } else {
            i -= 1;
        }
    }

    return Promise.resolve(result);
};