import React, { useId, useRef, useEffect, useState } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
  initialFocus = false,
}) {
  const id = useId();

  const fromRef = useRef(null);
  const [hasFocused, setHasFocused] = useState(false);
  useEffect(() => {
    console.log("hasFocused", hasFocused);
    console.log("initialFocus", initialFocus);
    console.log("booli", !(hasFocused ^ initialFocus));
    if (!(hasFocused ^ initialFocus)) {
      fromRef.current.focus();
      setHasFocused((e) => !e);
      console.log("hasFocused outsde", hasFocused);
    }
  }, [hasFocused, initialFocus]);

  return (
    <div
      className={`bg-gray-500/35 p-3 rounded-lg text-sm flex flex-wrap ${className}`}
    >
      <div className=" w-1/2 justify-start">
        <label htmlFor={id} className="text-white/70 mb-2">
          {label}
        </label>
        <input
          type="number"
          className="outline-none w-full bg-transparent py-1.5 text-white"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          id={id}
          ref={fromRef}
          onChange={(e) => {
            onAmountChange && onAmountChange(Number(e.target.value));
          }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-white/70 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 cursor-pointer outline-none bg-gray-200 opacity-50 text-black/100"
          value={selectedCurrency}
          onChange={(e) => {
            onCurrencyChange && onCurrencyChange(e.target.value);
          }}
        >
          {currencyOptions.map((currency) => (
            <option
              className="bg-black/10 backdrop-blur-sm"
              key={currency}
              value={currency}
            >
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
