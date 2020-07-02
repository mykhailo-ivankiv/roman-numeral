import decimalToRoman from './decimalToRoman.js';
import romanToDecimal from "./romanToDecimal.js";

const romanInput = document.getElementById('roman');
const romanErrorEl = document.getElementById('romanError');

const arabInput = document.getElementById('arab');
const arabErrorEl = document.getElementById('arabError');

const processRomanToDec = (romanString) => {
  romanToDecimal(romanString)
    .then((value) => {
      arabInput.value = value;
      romanErrorEl.getElementsByClassName('roman-app__error-description')[0].innerHTML = '';
      romanErrorEl.getElementsByClassName('roman-app__error-string')[0].innerHTML = '';
    })
    .catch(({ msg, position }) => {
      romanErrorEl.getElementsByClassName('roman-app__error-description')[0].innerHTML = msg;

      romanErrorEl.getElementsByClassName('roman-app__error-string')[0].innerHTML =
        romanString.slice(0, position) +
        `<i class="roman-app__error-letter">${romanString[position]}</i>` +
        romanString.slice(position + 1);
    });
};

const processDecToRoman = (decString) => {
  decimalToRoman(decString)
    .then((value) => {
      romanInput.value = value;

      arabErrorEl.getElementsByClassName('roman-app__error-description')[0].innerHTML = '';
      arabErrorEl.getElementsByClassName('roman-app__error-string')[0].innerHTML = '';
    })
    .catch(({ msg, position }) => {
      arabErrorEl.getElementsByClassName('roman-app__error-description')[0].innerHTML = msg;
      arabErrorEl.getElementsByClassName('roman-app__error-string')[0].innerHTML = '';
    });
};

if (romanInput.value) {
  processRomanToDec(romanInput.value);
} else if (arabInput.value) {
  processDecToRoman(arabInput.value);
}

romanInput.addEventListener('input', () => {
  processRomanToDec(romanInput.value);
});

arabInput.addEventListener('input', () => {
  processDecToRoman(arabInput.value);
});
