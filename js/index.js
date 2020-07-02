import decimalToRoman from './decimalToRoman.js';
import romanToDecimal from './romanToDecimal.js';

const romanInput = document.getElementById('roman');
const romanErrorEl = document.getElementById('romanError');

const arabInput = document.getElementById('arab');
const arabErrorEl = document.getElementById('arabError');

const processRomanToDecimal = async (romanString) => {
  try {
    const value = await romanToDecimal(romanString);

    arabInput.value = value;
    romanErrorEl.getElementsByClassName('roman-app__error-description')[0].innerHTML = '';
    romanErrorEl.getElementsByClassName('roman-app__error-string')[0].innerHTML = '';
  } catch ({ msg, position }) {
    romanErrorEl.getElementsByClassName('roman-app__error-description')[0].innerHTML = msg;
    romanErrorEl.getElementsByClassName('roman-app__error-string')[0].innerHTML =
      romanString.slice(0, position) +
      `<i class="roman-app__error-letter">${romanString[position]}</i>` +
      romanString.slice(position + 1);
  }
};

const processDecimalToRoman = async (decString) => {
  try {
    const value = await decimalToRoman(decString);

    romanInput.value = value;
    arabErrorEl.getElementsByClassName('roman-app__error-description')[0].innerHTML = '';
    arabErrorEl.getElementsByClassName('roman-app__error-string')[0].innerHTML = '';
  } catch ({ msg, position }) {
    arabErrorEl.getElementsByClassName('roman-app__error-description')[0].innerHTML = msg;
    arabErrorEl.getElementsByClassName('roman-app__error-string')[0].innerHTML = '';
  }
};
const init = () => {
  if (romanInput.value) processRomanToDecimal(romanInput.value);
  else if (arabInput.value) processDecimalToRoman(arabInput.value);

  romanInput.addEventListener('input', () => processRomanToDecimal(romanInput.value));
  arabInput.addEventListener('input', () => processDecimalToRoman(arabInput.value));
};

init();
