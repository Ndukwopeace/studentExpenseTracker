import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import {useState} from "react";
import {getTodayString} from "../utils/DateConverter.js";

export default function AddExpense({expenses , onSetExpenses , onsetShowModal}){
    const [amount , setAmount] = useState(0);
    const [category , setCategory] = useState("");
    const [description , setDescription] = useState("");


    function handleSubmit(e){
        e.preventDefault();
        const newExpense = {
            id: expenses.length + 1,
            date: getTodayString(),
            amount: amount,
            description: description,
            category: category
        }

        console.log(newExpense);
        onSetExpenses(newExpense);
        onsetShowModal(false);
    }



    return(
        <div className="flex flex-col gap-2">
            <h3 className="text-2xl">Add Expense</h3>
            <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input placeholder="Amount (XAF)" type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                <select className="p-3" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option>Select Category</option>
                    <option value={"Food"}>🍔 Food</option>
                    <option value={"Housing"}>🏠 Housing</option>
                    <option value={"Transport"}>🚎 Transport</option>
                    <option value={"Internet"}>🟢 Internet</option>
                </select>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Add a short note"  className="w-[100%] p-2.5"/>
                <Button type="submit">Save</Button>
            </Form>
        </div>
    )
}