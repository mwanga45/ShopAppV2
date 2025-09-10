import React from "react"
import "./button.css"
interface Submitbtnprops{
    onclick?:React.MouseEventHandler<HTMLButtonElement>
    buttonName:string

}
export  const Submitbtn:React.FC<Submitbtnprops> = ({onclick,buttonName})=>{
    const handleClick:React.MouseEventHandler<HTMLButtonElement>=(e)=>{
        e.preventDefault()
        if(onclick){
            onclick(e)
        }
    }
    return(
        <button className="submit-btn-container" onClick={handleClick}>
        {buttonName}
        </button>
    )
}