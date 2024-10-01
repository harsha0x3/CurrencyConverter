import { useState, useEffect } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components/index.js";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [initialFocus, setInitialFocus] = useState(false);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const swap = () => {
    const toTemp = to;
    setTo(from);
    setFrom(toTemp);
    const amoTemp = amount;
    setAmount(convertedAmount);
    setConvertedAmount(amoTemp);
    setInitialFocus((prev) => !prev);
  };

  /*  useEffect(() => {
    console.log("con amount updated", convertedAmount);
    console.log("curr info -to:", currencyInfo[to]);
  }, [convertedAmount]); */

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-black"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/4386379/pexels-photo-4386379.jpeg?auto=compress&cs=tinysrgb&w=600)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-700 rounded-lg p-5 backdrop-blur-sm bg-white/25 shadow-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
                initialFocus={initialFocus}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black/10 rounded-md bg-blue-600 text-white px-2 py-0.5 shadow-2xl"
                onClick={() => {
                  swap();
                }}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1 shadow-2xl">
              <InputBox
                label="to"
                amount={convertedAmount}
                currencyOptions={options}
                amountDisabled={true}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
              />
            </div>
            <button
              className="w-full rounded-md bg-blue-600 text-white py-2.5 shadow-2xl"
              type="submit"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
