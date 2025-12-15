import Button from "./Button";

export default function ExpenseItem({ expense, onDelete }) {
    return (
        <div className="flex justify-between items-center bg-white rounded-xl p-3 shadow">
            <div>
                <p className="font-semibold">{expense.category}</p>
                <p className="text-sm text-gray-500">{expense.note}</p>
                <p className="text-xs text-gray-400">{expense.date}</p>
            </div>

            <div className="text-right">
                <p className="text-red-500 font-bold">
                    -{expense.amount} XAF
                </p>
                <Button
                    className="bg-red-500 text-sm mt-1"
                    onClick={() => onDelete(expense.id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}
