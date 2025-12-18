import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useEffect, useState } from "react";
import { getTodayString } from "../utils/DateConverter.js";
import api from "../api/api.js";

export default function AddExpense({ onSetExpenses, onsetShowModal, editExpense, updateExpense }) {
    const [amount, setAmount] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    // Load categories from backend
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await api.get("/categories/");
                setCategories(res.data);
            } catch {
                setError("Failed to load categories");
            }
        }
        fetchCategories();
    }, []);

    // Populate form if editing
    useEffect(() => {
        if (editExpense) {
            setAmount(editExpense.amount);
            setDescription(editExpense.description || "");
            setCategoryId(editExpense.category.id);
        } else {
            setAmount("");
            setDescription("");
            setCategoryId("");
        }
    }, [editExpense]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!amount || Number(amount) <= 0) {
            setError("Amount must be greater than zero");
            return;
        }

        if (!categoryId) {
            setError("Please select a category");
            return;
        }

        const payload = {
            description,
            amount: Number(amount),
            category_id: categoryId,
            date: getTodayString(),
        };

        try {
            if (editExpense) {
                // Update existing expense
                await updateExpense(editExpense.id, payload);
            } else {
                // Create new expense
                const res = await api.post("/expenses/", payload);
                onSetExpenses(res.data); // Add new expense to state
            }

            onsetShowModal(false);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to save expense");
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-2xl">{editExpense ? "Edit Expense" : "Add Expense"}</h3>

            {error && (
                <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
                    {error}
                </div>
            )}

            <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                    placeholder="Amount (XAF)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <select
                    className="p-3 rounded-xl"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.emoji} {cat.name}
                        </option>
                    ))}
                </select>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a short note"
                    className="w-full p-2.5 rounded-xl"
                />

                <Button type="submit">{editExpense ? "Update" : "Save"}</Button>
            </Form>
        </div>
    );
}
