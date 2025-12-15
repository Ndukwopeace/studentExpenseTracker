export default function Button({children , type="button" , className , onClick}){
    return (
        <button type={type} className={`bg-teal-500 text-white  text-2xl rounded-xl p-1.5 hover:cursor-pointer ${className}`}
                onClick={onClick} >
            {children}
        </button>
    )
}