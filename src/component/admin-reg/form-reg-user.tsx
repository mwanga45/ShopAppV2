export  const FormRegUser = ()=>{
    const handleSubmit = (e:React.FormEvent)=>{ 
        e.preventDefault()
    }
    return(
        <div className="reg-user-container-form">
            <form onSubmit={handleSubmit}></form>
        </div>
    )
} 