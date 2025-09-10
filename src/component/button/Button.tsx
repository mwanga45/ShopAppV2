import React from "react"
import "./button.css"


export type ButtonType ='submit'|'button'

interface ButtonTraits {
  buttonName:string
  Onclick?:React.MouseEventHandler<HTMLButtonElement>
  type?:ButtonType
}
export const  Button:React.FC<ButtonTraits> =({buttonName,Onclick,type})=> {
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if(Onclick){
      Onclick(e)
      console.log("Button clicked!")
    }
  }
  return (
    <button className="animated-btn" onClick={handleClick} type={type}>
      {buttonName}
    </button>
  )
}
