const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const resetBtn = document.getElementById('reset-btn');

const totalCreditEl = document.getElementById('total-credit');
const totalDebitEl = document.getElementById('total-debit');
const netBalanceEl = document.getElementById('net-balance');

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Update totals
const updateSummary = () => {
  let credit = 0, debit = 0;

  transactions.forEach(tx => {
    if (tx.type === 'Credit') {
      credit += parseFloat(tx.amount);
    } else if (tx.type === 'Debit') {
      debit += parseFloat(tx.amount);
    }
  });

  totalCreditEl.textContent = credit.toFixed(2);
  totalDebitEl.textContent = debit.toFixed(2);
  netBalanceEl.textContent = (credit - debit).toFixed(2);
};

// Render transactions
const renderTransactions = () => {
  list.innerHTML = '';
  transactions.forEach(tx => {
    const card = document.createElement('div');
    card.className = `transaction-card ${tx.type.toLowerCase()}`;
    card.innerHTML = `
      <h4>${tx.type} - ₹${tx.amount}</h4>
      <p><strong>Holder:</strong> ${tx.holder}</p>
      <p><strong>Reason:</strong> ${tx.reason}</p>
      <p><strong>Date:</strong> ${tx.date}</p>
    `;
    list.appendChild(card);
  });

  updateSummary();
};

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;
  const holder = document.getElementById('holder').value;
  const reason = document.getElementById('reason').value;
  const date = document.getElementById('date').value;

  const newTx = { amount, type, holder, reason, date };
  transactions.push(newTx);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  form.reset();
  renderTransactions();
});

// Handle Reset
resetBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all transactions?")) {
    transactions = [];
    localStorage.removeItem("transactions");
    renderTransactions();
  }
});

// Initial render
renderTransactions();
