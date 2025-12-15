import Button from "./Button";
import {formatCurrency} from "../utils/currencyFormatter.js";

export default function ExpenseItem({ expense, onDelete ,onSelectExpense , selectedExpense}) {

    return (
        <div className="flex justify-between items-center bg-white rounded-xl p-3 shadow"
             >
            <div onClick={()=>onSelectExpense(expense.id)}>
                <p className="font-semibold">{expense.category}</p>
                { selectedExpense === expense.id && <p className="text-sm text-gray-500">{expense.description}</p>}
                <p className="text-xs text-gray-400">{expense.date}</p>
            </div>

            <div className="text-right flex items-center gap-2">
                <p className="text-red-500 font-bold">
                    -{formatCurrency(expense.amount)}
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
