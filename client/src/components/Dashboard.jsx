import Button from "./Button.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import AddExpense from "./AddExpense.jsx";
import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import api from "../api/api.js";

export default function Dashboard() {
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [editExpense, setEditExpense] = useState(null); // For editing
    const navigate = useNavigate();

    // Fetch all expenses
    useEffect(() => {
        async function fetchExpenses() {
            try {
                const res = await api.get("/expenses/");
                setExpenses(res.data);
            } catch {
                console.error("Failed to fetch expenses");
            }
        }
        fetchExpenses();
    }, []);

    // Delete expense
    async function deleteExpense(id) {
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses(prev => prev.filter(exp => exp.id !== id));
        } catch {
            console.error("Failed to delete expense");
        }
    }

    // Edit expense
    async function updateExpense(id, updatedData) {
        try {
            const res = await api.put(`/expenses/${id}`, updatedData);
            setExpenses(prev =>
                prev.map(exp => (exp.id === id ? { ...exp, ...updatedData } : exp))
            );
            setEditExpense(null);
        } catch {
            console.error("Failed to update expense");
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    function handleSetExpense(newExpense) {
        setExpenses(prev => [...prev, newExpense]);
    }

    const totalExpense = expenses.reduce(
        (acc, exp) => acc + (Number(exp.amount) || 0),
        0
    );

    function handleSelectedExpense(id) {
        setSelectedExpense(prev => (prev === id ? null : id));
    }

    return (
        <div>
            <Outlet
                context={{
                    handleLogout,
                    expenses,
                    deleteExpense,
                    totalExpense,
                    selectedExpense,
                    handleSelectedExpense,
                    editExpense,
                    setEditExpense,
                    updateExpense
                }}
            />

            <Button
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full"
                onClick={() => {
                    setEditExpense(null);
                    setShowModal(true);
                }}
            >
                +
            </Button>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <AddExpense
                    onSetExpenses={handleSetExpense}
                    onsetShowModal={setShowModal}
                    editExpense={editExpense}
                    updateExpense={updateExpense}
                />
            </Modal>
        </div>
    );
}
