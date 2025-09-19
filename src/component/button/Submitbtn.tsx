import React from "react"
import "./button.css"
interface Submitbtnprops{
    onclick?:React.MouseEventHandler<HTMLButtonElement>
    buttonName:string
    type?: "submit" | "button" | "reset";

}
export  const Submitbtn:React.FC<Submitbtnprops> = ({onclick,buttonName,type="button"})=>{
    const handleClick:React.MouseEventHandler<HTMLButtonElement>=(e)=>{
        if(type !== "submit"){
            e.preventDefault();
        }
        if(onclick){
            onclick(e)
        }
    }
    return(
        <button className="submit-btn-container" onClick={handleClick} type={type}>
        {buttonName}
        </button>
    )
}