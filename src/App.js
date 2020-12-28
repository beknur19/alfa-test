import 'bootstrap/dist/css/bootstrap.min.css';
import LoanSchedule, { DIFF_PAYMENT } from './LoanPaymentsSchedule';

function App() {
  return (
    <div className="container border">
      <h3 className="my-4">График погашения кредита</h3>
      <LoanSchedule total={10000000} months={12} percent={10} paymentType={DIFF_PAYMENT} />
    </div>
  );
}

export default App;
