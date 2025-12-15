import Button from "./Button.jsx";
import SummaryCard from "./SummaryCard.jsx";
import ExpenseList from "./ExpenseList.jsx";
import {useNavigate, useOutletContext} from "react-router-dom";

export default function Home(){
    const {handleLogout} = useOutletContext()
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 pt-2 ">
            <Button onClick={handleLogout} className="bg-teal-500">Logout</Button>

            <h1 className="text-3xl">Welcome, PEACE</h1>

            <SummaryCard/>

            <div className="flex flex-wrap gap-2 justify-center relative">
                <Button onClick={()=>navigate('/dashboard/all-expenses')} >All Expenses</Button>
                <Button >Today's Expenses</Button>
            </div>


            <ExpenseList>
                <h3 className="text-2xl">Today's Expenses: </h3>
                <ul className="px-3 pt-2">
                    <li className="text-xl border-b-[0.01rem]"> <span>🍔</span> Food : 1500 XAF</li>
                </ul>
            </ExpenseList>

        </div>
    )
}