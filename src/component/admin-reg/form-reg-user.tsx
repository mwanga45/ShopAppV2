import React, { useState } from "react"
export const FormRegUser = () => {
    const [showAdminDetails, setShowAdminDetails] = useState<boolean>(true)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShowAdminDetails(!showAdminDetails)
    }
    return (
        <div className="reg-user-container-form">
            <form onSubmit={handleSubmit}>
                {showAdminDetails ? (
                    <>
                        <div className="user-input-container">
                            <label htmlFor="ademail">Admin-email</label>
                            <input type="email" id="ademail" name="ademail" placeholder="Enter Admin-email" required />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="admin-paswrd">Admin password </label>
                            <input type="password" name="password" placeholder="Admin password" />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="role">Role </label>
                            <select name="role" id="role">
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </select>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="user-input-container">
                            <label htmlFor="fname">Firstname</label>
                            <input type="text" id="fname" name="firstname" placeholder="Enter Firstname" required />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="sname">Secondname</label>
                            <input type="text" id="sname" name="secondname" placeholder="Enter Second name" required />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="ademail">Email</label>
                            <input type="email" id="ademail" name="email" placeholder="Enter Admin-email" required />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="ph">Phone Number</label>
                            <input type="text" id="ph" name="phonenumber" placeholder="Enter Phone Number" required />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="pwr">Password</label>
                            <input type="text" id="pwr" name="password" placeholder="Enter Password" required />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="cpwr">Confirm-Password</label>
                            <input type="pasword" id="ademail" name="ademail" placeholder="Enter Admin-email" required />
                        </div>
                    </>
                )}
            </form>
        </div>
    )
} 