
"use client"
interface ButtonProps {
text:string;
onClick:()=>void;
variant?:"filled" | "outlined";
classname?:string;
children?:React.ReactNode;
}
const Button = (
    {text, onClick, variant="filled", classname="",children}:ButtonProps
) =>{

    const baseStyle="px-4 py-3 rounded cursor-pointer font-semibold transition duration-300 ease-in-out ";
    const variantStyle = variant === "filled" ? "bg-yellow-600 text-white hover:bg-yellow-200 hover:text-black" : "border border-yellow-800 text-white-600 hover:bg-yellow-200 hover:text-black";
    const combinedStyle = `${baseStyle} ${variantStyle} ${classname}`;
    return(
        <button onClick={onClick} className={combinedStyle}>
            {children ?? text}
        </button>
    )
}

export default Button;
