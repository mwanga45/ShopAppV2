import React, { useState } from "react"
import { Submitbtn } from "../button/Submitbtn"
import { RegisterUser } from "../../AdminPanel/adminservice"
import { AdminVerification } from "../../AdminPanel/adminservice"


interface FormInterface {
    firstname?: string,
    secondname?: string,
    password?: string,
    email?: string,
    role?: string,
    phone_number?: string,
    confirm_password?: string,
    nida?: string
}
export const FormRegUser: React.FC<FormInterface> = ({ firstname, secondname, nida, password, confirm_password, phone_number, email, role }) => {
    const [showAdminDetails, setShowAdminDetails] = useState<boolean>(true)
    const [Verification, setVerification] = useState<FormInterface>({
        email: email,
        password: password,
        role: role
    })
    const [UserInfo, setUserInfo] = useState<FormInterface>({
        firstname: firstname,
        secondname: secondname,
        nida: nida,
        confirm_password: confirm_password,
        phone_number: phone_number,
        role: Verification.role,
        email: email,
        password: password
    })
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setVerification({ ...Verification, [name]: value })
        setUserInfo({ ...UserInfo, [name]: value })
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // check password match
        if (UserInfo.password !== UserInfo.confirm_password) {
            alert("password do not match")
            setUserInfo({ ...UserInfo, confirm_password: "", password: "" });
            return;
        }
        const RegisterNew_user = async () => {
            try {
                const response = await RegisterUser(UserInfo)
                if (!response?.data.success) {
                    alert(response?.data.message)
                    return
                }
                alert(response?.data.message)
                setShowAdminDetails(!showAdminDetails)
            } catch (err) {
                console.error(err)
                alert("Something went wrong")
                throw err
            }
        }
        RegisterNew_user()
    }
    const handleSubmitverificatiom = (e: React.FormEvent) => {
        e.preventDefault()
        const VerifyAdminAccount = async () => {
            try {
                const payload_dverify = {
                    email: Verification.email,
                    password: Verification.password,
                }
                const response = await AdminVerification(payload_dverify)
                if (!response?.data.success) {
                    alert(response.data.message)
                    return
                }
                setVerification({ ...Verification, email: "", password: "" })
                alert(response.data.message)
                setShowAdminDetails(!showAdminDetails)
            } catch (err) {
                console.error("failed to verify admin", err)
                throw err
            }
            
        }
        VerifyAdminAccount()
        

    }
    return (
        <div className="reg-user-container-form">
            <form >
                {showAdminDetails ? (
                    <>
                        <div className="user-input-container">
                            <label htmlFor="ademail">Admin-email</label>
                            <input type="email" id="ademail" name="ademail" placeholder="Enter Admin-email" onChange={handleOnchange} value={Verification.email} required />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="admin-paswrd">Admin password </label>
                            <input type="password" name="password" placeholder="Admin password" onChange={handleOnchange} value={Verification.password} />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="role">Role </label>
                            <select name="role" id="role" value={Verification.role} onChange={handleOnchange} required>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </select>
                        </div>
                        <Submitbtn buttonName="Proceed" onclick={handleSubmitverificatiom} />

                    </>
                ) : (
                    <>
                        <div className="name-inputs-format">
                            <div className="user-input-container">
                                <label htmlFor="fname">Firstname</label>
                                <input type="text" id="fname" name="firstname" placeholder="Enter Firstname" required onChange={handleOnchange} value={UserInfo.firstname} />
                            </div>
                            <div className="user-input-container">
                                <label htmlFor="sname">Secondname</label>
                                <input type="text" id="sname" name="secondname" placeholder="Enter Second name" required onChange={handleOnchange} value={UserInfo.secondname} />
                            </div>
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="ademail">Email</label>
                            <input type="email" id="ademail" name="email" placeholder="Enter Admin-email" required onChange={handleOnchange} value={UserInfo.email} />
                        </div>
                        <div className="name-inputs-format">
                            <div className="user-input-container">
                                <label htmlFor="nd">Nida</label>
                                <input type="text" id="nd" name="nida" placeholder="XXXXX-XXXX-XX-X" required onChange={handleOnchange} value={UserInfo.nida} />
                            </div>
                            <div className="user-input-container">
                                <label htmlFor="ph">Phone Number</label>
                                <input type="text" id="ph" name="phone_number" placeholder="Enter Phone Number" required onChange={handleOnchange} value={UserInfo.phone_number} />
                            </div>
                        </div>
                        <div className="name-inputs-format">
                            <div className="user-input-container">
                                <label htmlFor="pwr">Password</label>
                                <input type="text" id="pwr" name="password" placeholder="Enter Password" required onChange={handleOnchange} value={UserInfo.password} />
                            </div>
                            <div className="user-input-container">
                                <label htmlFor="cpwr">Confirm-Password</label>
                                <input type="pasword" id="ademail" name="ademail" placeholder="Enter Admin-email" required onChange={handleOnchange} value={UserInfo.confirm_password} />
                            </div>
                        </div>
                        <Submitbtn buttonName="Register" onclick={handleSubmit} />
                    </>
                )}

            </form>
        </div>
    )
} 