import PropTypes from 'prop-types';

export const ANNUITY_PAYMENT = "annuity";
export const DIFF_PAYMENT = "diff";

export default function LoanForm(props) {
  const { paymentType, handleChange } = props;

  const buttons = [
    {
      name: ANNUITY_PAYMENT,
      title: "Аннуитетный платеж",
    },
    {
      name: DIFF_PAYMENT,
      title: "Дифференцированный платеж",
    },
  ]

  return (
    <form>
      {buttons.map(btn => (
        <div className="form-check" key={btn.name}>
          <input className="form-check-input"
            type="radio"
            value={btn.name}
            id={btn.name}
            checked={paymentType === btn.name}
            onChange={handleChange} />
          <label className="form-check-label" htmlFor={btn.name}>
            {btn.title}
          </label>
        </div>
      ))}
    </form>
  )
}

LoanForm.propTypes = {
  paymentType: PropTypes.oneOf([ANNUITY_PAYMENT, DIFF_PAYMENT]),
  handleChange: PropTypes.func.isRequired,
}
