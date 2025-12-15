import ExpenseItem from "./ExpenseItem";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "./Button";

export default function AllExpenses() {
    const { deleteExpense, expenses } = useOutletContext();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 pt-2">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button
                    className="bg-gray-200 text-black"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </Button>

                <h2 className="text-2xl font-bold">All Expenses</h2>
            </div>

            {expenses.length === 0 && (
                <p className="text-gray-500 text-center">
                    No expenses yet.
                </p>
            )}

            {expenses.map(expense => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDelete={deleteExpense}
                />
            ))}
        </div>
    );
}
