const decimalToRoman = (decimalString) => {
  const arab = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  const roman = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];

  let number = parseInt(decimalString);

  if (Number.isNaN(number)) {
    return Promise.reject({
      msg: 'Помилка: невірно записане число',
      position: 0,
    });
  } else if (number.toString().length !== decimalString.length) {
    return Promise.reject({
      msg: 'Помилка: невірно записане число',
      position: 0,
    });
  } else if (number < 0) {
    return Promise.reject({
      msg: 'Помилка: число повинне бути більше 0',
      position: 0,
    });
  } else if (number > 3999) {
    return Promise.reject({
      msg: 'Помилка: число повинне бути менше 4000',
      position: 0,
    });
  }

  let i = arab.length;
  let result = '';

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

export default decimalToRoman;
