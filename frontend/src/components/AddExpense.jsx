import React, { useState } from "react";
import API from "../api";

const CATEGORIES = [
    "Food",
    "Transport",
    "Housing",
    "Movies",
    "Utilities",
    "Healthcare",
    "Education",
    "Shopping",
    "Other",
];

export default function AddExpense({ onSaved }) {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        if (!category || !amount) {
            setMsg("Please provide category and amount.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                category,
                amount: Number(amount),
                date: date || undefined,
                description,
            };

            await API.post("/api/expenses", payload);

            setMsg("Expense saved.");
            setCategory("");
            setAmount("");
            setDate("");
            setDescription("");

            if (typeof onSaved === "function") onSaved();
        } catch (err) {
            console.error(err);
            setMsg(err?.response?.data?.message || "Failed to save expense.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                Add Expense
            </h3>

            <form
                onSubmit={handleSubmit}
                className="bg-[#0b0f12] p-6 sm:p-8 rounded-2xl shadow-lg border border-[#111318]"
            >
                {msg && (
                    <div
                        className={`mb-4 text-sm px-3 py-2 rounded ${msg === "Expense saved."
                            ? "bg-green-900/20 text-green-300"
                            : "bg-red-900/20 text-red-300"
                            }`}
                    >
                        {msg}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-base text-white font-semibold">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full mt-2 rounded-lg bg-[#23282c] px-3 py-2 text-white"
                        >
                            <option value="" className="bg-[#23282c] text-gray-400">
                                Select category
                            </option>
                            {CATEGORIES.map((c) => (
                                <option
                                    key={c}
                                    value={c}
                                    className="bg-[#23282c] text-white"
                                >
                                    {c}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div>
                        <label className="text-base text-white font-semibold">Amount (INR)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full mt-2 rounded-lg bg-[#23282c] px-3 py-2 text-white focus:ring-2 focus:ring-[#b5f277]"
                        />
                    </div>

                    <div>
                        <label className="text-base text-white font-semibold">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full mt-2 rounded-lg bg-[#23282c] px-3 py-2 text-white focus:ring-2 focus:ring-[#b5f277]"
                        />
                    </div>

                    <div>
                        <label className="text-base text-white font-semibold">Description</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional note"
                            className="w-full mt-2 rounded-lg bg-[#23282c] px-3 py-2 text-white focus:ring-2 focus:ring-[#b5f277]"
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-[#b5f277] rounded-lg text-black font-semibold"
                    >
                        {loading ? "Saving..." : "Save Expense"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setCategory("");
                            setAmount("");
                            setDate("");
                            setDescription("");
                            setMsg("");
                        }}
                        className="px-6 py-2 border border-[#b5f277] rounded-lg text-[#b5f277]"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
