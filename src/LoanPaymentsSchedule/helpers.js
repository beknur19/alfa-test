function calculateAnnuitData(total, months, percent) {
  const monthPercent = percent / (12 * 100);
  const monthPayment = (total * monthPercent) / (1 - ((1 + monthPercent) ** -months));

  const nextDateGen = getNextPaymentDate(new Date());

  const data = [];
  let balance = total;

  for (let x = 0; x < months; x++) {
    const { value: date } = nextDateGen.next();

    const percentPayment = balance * monthPercent;
    const debitPayment = monthPayment - percentPayment;

    balance -= debitPayment;

    data.push({
      payment: monthPayment,
      debit: debitPayment,
      percent: percentPayment,
      balance,
      date,
    });
  }

  return data;
}

function calculateDiffData(total, months, percent) {
  const nextDateGen = getNextPaymentDate(new Date());
  const paymentGen = calculateDiffPayment(total, months, percent);
  const data = [];

  for (const { debitPayment, percentPayment, balance } of paymentGen) {
    const { value: date } = nextDateGen.next();

    data.push({
      payment: debitPayment + percentPayment,
      debit: debitPayment,
      percent: percentPayment,
      balance,
      date,
    });
  }

  return data;
}

function* calculateDiffPayment(total, months, percent) {
  let balance = total;

  while (Math.floor(balance)) {
    const debitPayment = total / months;
    const percentPayment = balance * (percent / 100 / 12);

    balance -= debitPayment

    yield { debitPayment, percentPayment, balance };
  }
}

function* getNextPaymentDate(startDateTime) {
  const month = startDateTime.getMonth();
  const day = startDateTime.getDate();

  let i = 1;

  while (true) {
    const copy = new Date(startDateTime);
    const settedCopy = copy.setFullYear(copy.getFullYear(), month + i, day);
    const newDate = new Date(settedCopy);

    if (newDate.getDate() !== day) {
      newDate.setDate(0);
    }

    yield newDate.toLocaleDateString();

    i++;
  }
}


function format(float) {
  return float.toFixed(2);
}

export {
  calculateAnnuitData,
  calculateDiffData,
  getNextPaymentDate,
  format,
}
