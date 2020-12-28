import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import LoanScheduleItem from "./LoanScheduleItem";
import LoanForm, { DIFF_PAYMENT, ANNUITY_PAYMENT } from "./LoanForm";
import { calculateAnnuitData, calculateDiffData } from "./helpers";

export { DIFF_PAYMENT, ANNUITY_PAYMENT };

export default function LoanSchedule(props) {
  const { total, months, percent, paymentType: type} = props;

  const [items, setItems] = useState([]);
  const [paymentType, setPaymentType] = useState(type || ANNUITY_PAYMENT);

  useEffect(() => {
    const map = {
      [ANNUITY_PAYMENT]: calculateAnnuitData,
      [DIFF_PAYMENT]: calculateDiffData,
    }

    if (map[paymentType]) {
      const data = map[paymentType](total, months, percent);
      setItems(data);
    } else {
      setItems([]);
    }
  }, [paymentType]);

  const handleChange = event => {
    setPaymentType(event.target.value);
  }

  return (
    <div>
      <LoanForm paymentType={paymentType} handleChange={handleChange} />
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Дата платежа</th>
            <th>Сумма платежа</th>
            <th>Остаток основного долга</th>
            <th>Оплата по основному долгу</th>
            <th>Оплата процента</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <LoanScheduleItem key={i} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

LoanSchedule.propTypes = {
  total: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  paymentType: PropTypes.oneOf([ANNUITY_PAYMENT, DIFF_PAYMENT]),
}
