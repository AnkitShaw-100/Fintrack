// import React, { useState } from "react";

// const CurrencyConverter = () => {
//   const [amount, setAmount] = useState(1);
//   const [from, setFrom] = useState("USD");
//   const [to, setTo] = useState("INR");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleConvert = async () => {
//     setLoading(true);
//     setError("");
//     setResult(null);
//     try {
//       // Use a free API for demonstration (replace with your own for production)
//       const res = await fetch(
//         `https://api.exchangerate-api.com/v4/latest/${from}`
//       );
//       const data = await res.json();
//       if (!data.rates[to]) throw new Error("Currency not supported");
//       setResult((amount * data.rates[to]).toFixed(2));
//     } catch (err) {
//       setError("Conversion failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#181f23] rounded-lg p-4 mt-6 shadow border border-[#23282c]">
//       <h3 className="text-lg font-bold text-white mb-2">Currency Converter</h3>
//       <div className="flex flex-col sm:flex-row gap-2 items-center">
//         <input
//           type="number"
//           className="rounded px-2 py-1 bg-[#0b0f12] text-gray-200 border border-[#23282c] w-24"
//           value={amount}
//           min={0}
//           onChange={e => setAmount(e.target.value)}
//         />
//         <select
//           className="rounded px-2 py-1 bg-[#0b0f12] text-gray-200 border border-[#23282c]"
//           value={from}
//           onChange={e => setFrom(e.target.value)}
//         >
//           <option>USD</option>
//           <option>INR</option>
//           <option>EUR</option>
//           <option>GBP</option>
//           <option>JPY</option>
//         </select>
//         <span className="text-[#b5f277] font-bold">→</span>
//         <select
//           className="rounded px-2 py-1 bg-[#0b0f12] text-gray-200 border border-[#23282c]"
//           value={to}
//           onChange={e => setTo(e.target.value)}
//         >
//           <option>USD</option>
//           <option>INR</option>
//           <option>EUR</option>
//           <option>GBP</option>
//           <option>JPY</option>
//         </select>
//         <button
//           className="bg-[#b5f277] text-[#0b0f12] px-3 py-1 rounded font-bold ml-2 hover:bg-[#a0e05e] transition"
//           onClick={handleConvert}
//           disabled={loading}
//         >
//           Convert
//         </button>
//       </div>
//       {result && (
//         <div className="mt-2 text-[#b5f277] font-bold">
//           {amount} {from} = {result} {to}
//         </div>
//       )}
//       {error && <div className="mt-2 text-red-400">{error}</div>}
//     </div>
//   );
// };

// export default CurrencyConverter;
