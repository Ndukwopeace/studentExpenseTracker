export default function Input({placeholder , type , className , onChange , required}){

    return (
        <input placeholder={placeholder} type={type}  className={className + " p-2.5 px-4 rounded-2xl w-[100%]"}
        onChange={onChange}  required={required}
        />
    )
}