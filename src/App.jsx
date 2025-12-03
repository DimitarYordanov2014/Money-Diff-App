import { useState, useRef, useEffect } from "react";
import "./App.css";

const rate = 1.95583;

function App() {
  const [receivedValue, setReceivedValue] = useState("");
  const [receivedCurrency, setReceivedCurrency] = useState("BGN");

  const [costValue, setCostValue] = useState("");
  const [costCurrency, setCostCurrency] = useState("BGN");

  const [resultCurrency, setResultCurrency] = useState("EUR");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAppClick = (e) => {
    const isInputOrSelect = ["INPUT", "SELECT"].includes(e.target.tagName);
    if (!isInputOrSelect) {
      inputRef.current?.focus();
    }
  };

  const toEUR = (value, currency) =>
    currency === "EUR" ? parseFloat(value || 0) : parseFloat(value || 0) / rate;

  const toBGN = (value, currency) =>
    currency === "BGN" ? parseFloat(value || 0) : parseFloat(value || 0) * rate;

  const convert = (value, from, to) =>
    from === to
      ? parseFloat(value || 0)
      : to === "EUR"
      ? toEUR(value, from)
      : toBGN(value, from);

  const receivedInResultCurrency = convert(
    receivedValue,
    receivedCurrency,
    resultCurrency
  );
  const costInResultCurrency = convert(costValue, costCurrency, resultCurrency);
  const difference = receivedInResultCurrency - costInResultCurrency;

  return (
    <div className="app" onClick={handleAppClick}>
      <h1>Money Difference Calculator</h1>

      {/* Row 1: Received Money */}
      <div className="row">
        <label>Money Received:</label>
        <div className="input-group">
          <input
            ref={inputRef}
            type="number"
            value={receivedValue}
            onChange={(e) => setReceivedValue(e.target.value)}
            placeholder=""
          />
          <select
            value={receivedCurrency}
            onChange={(e) => setReceivedCurrency(e.target.value)}
          >
            <option value="BGN">BGN</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      {/* Row 2: Cost of Goods */}
      <div className="row">
        <label>Cost of Goods:</label>
        <div className="input-group">
          <input
            type="number"
            value={costValue}
            onChange={(e) => setCostValue(e.target.value)}
            placeholder=""
          />
          <select
            value={costCurrency}
            onChange={(e) => setCostCurrency(e.target.value)}
          >
            <option value="BGN">BGN</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      {/* Row 3: Result */}
      <div className="row">
        <label>Difference:</label>
        <div className="input-group">
          <input
            type="text"
            value={receivedValue && costValue ? difference.toFixed(2) : ""}
            readOnly
          />
          <select
            value={resultCurrency}
            onChange={(e) => setResultCurrency(e.target.value)}
          >
            <option value="EUR">EUR</option>
            <option value="BGN">BGN</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
