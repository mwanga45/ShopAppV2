import React from "react"
import "./button.css"

interface ButtonTraits {
  buttonName:string
  Onclick?:React.MouseEventHandler<HTMLButtonElement>
}
export const  Button:React.FC<ButtonTraits> =({buttonName,Onclick})=> {
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if(Onclick){
      Onclick(e)
      console.log("Button clicked!")
    }
  }
  return (
    <button className="animated-btn" onClick={handleClick}>
      {buttonName}
    </button>
  )
}
