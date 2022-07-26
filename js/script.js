'strict mode';

const dropListFrom = document.querySelector('.from select');
const dropListTo = document.querySelector('.to select');
const getExchangeButton = document.getElementById('getExchange');
const exchangeRateResult = document.querySelector('.exchange-rate');

for (let i = 0; i < currencyCode.length; i++) {
  const optionTag = `<option value="${currencyCode[i]}" >${currencyCode[i]}</option>`;
  dropListFrom.insertAdjacentHTML('beforeend', optionTag);
  dropListTo.insertAdjacentHTML('beforeend', optionTag);
}

function getExchangeRate() {
  // getting input values
  const fromInput = document.getElementById('from-Droplist').value;
  const toInput = document.getElementById('to-Droplist').value;
  const amountInput = document.getElementById('amount').value;
  console.log(fromInput, toInput, amountInput);

  // getting response about exchange rates
  var requestURL = `https://api.exchangerate.host/convert?from=${fromInput}&to=${toInput}&amount=${amountInput}`;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function () {
    var response = request.response;
    exchangeRateResult.textContent = `${amountInput}${fromInput} = ${response.result}${toInput} `;
    console.log(exchangeRateResult);
  };
}

getExchangeButton.addEventListener('click', getExchangeRate);
