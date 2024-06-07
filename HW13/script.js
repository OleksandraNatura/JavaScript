document.getElementById('fetchRates').addEventListener('click', fetchExchangeRates);

function fetchExchangeRates() {
    const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const filteredData = data.filter(item => item.rate > 25);
            displayRates(filteredData);
        })
        .catch(error => {
            document.getElementById('error').textContent = `Помилка під час запиту до API: ${error}`;
        });
}

function displayRates(rates) {
    const tableBody = document.querySelector('#exchangeRatesTable tbody');
    tableBody.innerHTML = '';

    if (rates.length === 0) {
        document.getElementById('error').textContent = 'Немає валют з курсом більше 25 грн.';
        return;
    } else {
        document.getElementById('error').textContent = '';
    }

    rates.forEach(rate => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rate.r030}</td>
            <td>${rate.txt}</td>
            <td>${rate.rate}</td>
            <td>${rate.cc}</td>
        `;
        tableBody.appendChild(row);
    });
}
