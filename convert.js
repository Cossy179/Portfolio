async function convertCurrency(from, to, amount, date) {
    const API_KEY = 'c26aacdfb7b1cc89bea529996e7de742'; 
    const endpoint = `https://api.exchangeratesapi.io/v1/convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`;

    if (date) {
        endpoint += `&date=${date}`;
    }

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.success) {
            console.log(`Converted ${data.query.amount} ${data.query.from} to ${data.query.to}: ${data.result}`);
            return data.result;
        } else {
            console.error('Error converting currency:', data.error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('convert').addEventListener('click', async function() {
        const from = document.getElementById('from-currency').value;
        const to = document.getElementById('to-currency').value;
        const amount = document.getElementById('amount').value;

        const result = await convertCurrency(from, to, amount);
        var CurrencyResult = document.getElementById('result');
        CurrencyResult.innerHTML = result
    });
});