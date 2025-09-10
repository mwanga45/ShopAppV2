interface Submitbtnprops{
    onclick?:React.MouseEventHandler<HTMLButtonElement>
    buttonName:string
    
}
export  const Submitbtn:React.FC<Submitbtnprops> = ()=>{
    return(
        <div className="submit-btn-container">

        </div>
    )
}