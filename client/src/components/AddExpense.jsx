import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

export default function AddExpense(){

    function addExpense(){

    }
    return(
        <div className="flex flex-col gap-2">
            <h3 className="text-2xl">Add Expense</h3>
            <Form handleSubmit={addExpense} className="flex flex-col gap-3">
                <Input placeholder="Amount (XAF)" type="number" />
                <Input placeholder="Category" />
                <textarea placeholder="Add a short note"  className="w-[100%] p-2.5"/>
                <Button>Save</Button>
            </Form>
        </div>
    )
}