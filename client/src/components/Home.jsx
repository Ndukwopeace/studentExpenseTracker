import Button from "./Button.jsx";
import SummaryCard from "./SummaryCard.jsx";
import ExpenseList from "./ExpenseList.jsx";
import {useNavigate, useOutletContext} from "react-router-dom";
import {getTodayString} from "../utils/DateConverter.js";
import ExpenseItem from "./ExpenseItem.jsx";

export default function Home(){
    const {handleLogout , totalExpense , expenses , selectedExpense , handleSelectedExpense , deleteExpense} = useOutletContext()
    const navigate = useNavigate();


    const today = getTodayString();

    const todayExpenses = expenses.filter((exp)=> exp.date === today);

    return (
        <div className="flex flex-col gap-4 pt-2 ">
            <Button onClick={handleLogout} className="bg-teal-500">Logout</Button>

            <h1 className="text-3xl">Welcome, PEACE</h1>

            <SummaryCard totalExpense={totalExpense}/>

            <div className="flex flex-wrap gap-2 justify-center relative">
                <Button onClick={()=>navigate('/dashboard/all-expenses')} >All Expenses</Button>
                <Button >Today's Expenses</Button>
            </div>


            <ExpenseList>
                <h3 className="text-2xl">Today's Expenses: </h3>
                <ul className="px-3 pt-2">
                    {
                        todayExpenses?.map((exp , index)=>{
                            return (
                                <ExpenseItem expense={exp} key={index} selectedExpense={selectedExpense}
                                             onSelectExpense={handleSelectedExpense} onDelete={deleteExpense}/>
                            )
                        })
                    }
                </ul>
            </ExpenseList>

        </div>
    )
}