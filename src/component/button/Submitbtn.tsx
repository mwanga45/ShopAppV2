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
        <div className="submit-btn-container">
             <button name="submit" onClick={handleClick}>
                {buttonName}
             </button>
        </div>
    )
}