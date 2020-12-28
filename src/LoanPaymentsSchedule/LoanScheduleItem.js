import React from "react";
import PropTypes from 'prop-types';
import { format } from "./helpers";

export default function LoanScheduleItem(props) {
  const {
    data: { date, payment, debit, percent, balance }
  } = props;

  return (
    <tr>
      <td>{date}</td>
      <td>{format(payment)}</td>
      <td>{format(balance)}</td>
      <td>{format(debit)}</td>
      <td>{format(percent)}</td>
    </tr>
  );
}

LoanScheduleItem.propTypes = {
  date: PropTypes.string,
  payment: PropTypes.number,
  balance: PropTypes.number,
  debit: PropTypes.number,
  percent: PropTypes.number,
}
