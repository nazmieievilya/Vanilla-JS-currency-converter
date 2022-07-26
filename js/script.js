'strict mode';

const dropListFrom = document.querySelector('.from select');
const dropListTo = document.querySelector('.to select');
const getExchangeButton = document.getElementById('getExchange');
const exchangeRateResult = document.querySelector('.exchange-rate');
const fromElement = document.getElementById('from-Droplist');
const toElement = document.getElementById('to-Droplist');
const fromImg = document.getElementById('fromImage');
const toImg = document.getElementById('toImage');
const switcher = document.getElementById('switch');
const switchImge = document.querySelector('.fas');
let fromInput = 'USD';
let toInput = 'UAH';

fromElement.value = fromInput;
toElement.value = toInput;
let amountInput = 1;

fromImg.src = `pics/${fromInput}.png`;
toImg.src = `pics/${toInput}.png`;

function currencySwitcher() {
  let switchVar = fromInput;
  // replacing api request values
  fromInput = toInput;
  toInput = switchVar;
  switchImge.classList.add('rotate-center');
  // updating select values
  fromElement.value = fromInput;
  toElement.value = toInput;
  fromImg.src = `pics/${fromInput}.png`;
  toImg.src = `pics/${toInput}.png`;

  getExchangeRate();
  window.setTimeout(function () {
    switchImge.classList.remove('rotate-center');
  }, 300);
}

function equalutyListener() {
  // Create variables you will reassign if select on change and comparing if they are equals
  if (fromElement.value === toElement.value) {
    currencySwitcher();
  } else {
    fromInput = fromElement.value;
    toInput = toElement.value;
    fromImg.src = `pics/${fromInput}.png`;
    toImg.src = `pics/${toInput}.png`;
  }
}

dropListFrom.addEventListener('change', e => {
  equalutyListener();
});
dropListTo.addEventListener('change', e => {
  equalutyListener();
});

function getExchangeRate() {
  amountInput = document.getElementById('amount').value;
  var requestURL = `https://api.exchangerate.host/convert?from=${fromInput}&to=${toInput}&amount=${amountInput}`;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function () {
    var response = request.response;
    exchangeRateResult.textContent = `${amountInput}${fromInput} = ${response.result}${toInput} `;
  };
}

getExchangeRate();
getExchangeButton.addEventListener('click', getExchangeRate);
switcher.addEventListener('click', currencySwitcher);
