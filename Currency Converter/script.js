document.getElementById('convertBtn').addEventListener('click', async () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('from').value;
  const toCurrency = document.getElementById('to').value;
  const resultDiv = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerText = "";
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (!rate) {
      resultDiv.innerText = "";
      alert("Conversion rate not available.");
      return;
    }

    const convertedAmount = (amount * rate).toFixed(2);
    resultDiv.innerText = `${convertedAmount} ${toCurrency}`;
  } catch (error) {
    resultDiv.innerText = "";
    alert("Error fetching exchange rate.");
    console.error(error);
  }
});
