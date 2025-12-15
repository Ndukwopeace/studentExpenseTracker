import Button from "./Button.jsx";

export default function SummaryCard(){
    return(
        <div className="bg-teal-500  rounded-xl px-3  py-5 flex flex-col gap-2 text-center">
            <h3 className="text-xl">Total Expense This month</h3>
            <p className="text-3xl text-red-500"> -42000 xaf</p>
            <div className="flex gap-2">
                <Button className="bg-teal-950 text-white">This month</Button>
                <Button className="text-white">This week</Button>
            </div>

        </div>
    )
}