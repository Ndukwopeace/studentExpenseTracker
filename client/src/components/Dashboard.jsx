import Button from "./Button.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import SummaryCard from "./SummaryCard.jsx";
import ExpenseList from "./ExpenseList.jsx";
import AddExpense from "./AddExpense.jsx";
import {useState} from "react";
import Modal from "./Modal.jsx";

import {studentExpenses} from "../data/studentExpense.js";

export default function Dashboard(){
    const [selectedExpense , setSelectedExpense] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [expenses , setExpenses] = useState(studentExpenses)


    function handleSelectedExpense(id){
        selectedExpense === id ? setSelectedExpense(null) :
            setSelectedExpense(id);

    }

    function deleteExpense(id) {
        setExpenses(expenses.filter(exp => exp.id !== id));
    }

    function getTotalExpense(){
        return expenses.reduce((acc , exp)=> Number(exp.amount) + acc, 0)
    }

    const totalExpense = getTotalExpense();



    function handleLogout(){
       navigate('/');
    }

    function handleSetExpense(newExpense){
        setExpenses((prevExp)=>[...prevExp , newExpense])
    }


    return(
        <div>
            <Outlet context={{handleLogout , expenses , deleteExpense , totalExpense ,
                handleSelectedExpense , selectedExpense}}/>

            <Button className="fixed bottom-6 right-6 w-14 h-14 rounded-full
                flex items-center justify-center shadow-lg" onClick={() => setShowModal(true)}>
                +
            </Button>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            >
                <AddExpense  expenses={expenses} onSetExpenses={handleSetExpense} onsetShowModal={setShowModal} />
            </Modal>
        </div>
    )
}