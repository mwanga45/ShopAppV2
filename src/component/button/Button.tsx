import React from "react"
import "./button.css"

interface ButtonTraits {
  buttonName:string
}
export const  Button:React.FC<ButtonTraits> =({buttonName})=> {
  const handleClick = () => {
    console.log("Button clicked!")
  }

  return (
    <button className="animated-btn" onClick={handleClick}>
      {buttonName}
    </button>
  )
}
