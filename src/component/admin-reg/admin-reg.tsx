import "./admin-reg.css"
import { OtherAc } from "../account/otherAc"
import { SummaryCard } from "../summaryCard/summarycard"
import { FaUserShield } from "react-icons/fa"
import { MdPerson } from "react-icons/md"
import { FormRegUser } from "./form-reg-user"
export const AdminReg = () => {
    return (
        <div className="admin-reg-container">
            <div className="title-bar-reg">
                <p className="reg-title">Admin Action</p>
            </div>
            <div className="info-form-container">
                <div className="info-bar">
                  <SummaryCard icon={FaUserShield} SummaryTitle="Admin-Account"/>
                  <SummaryCard icon={ MdPerson } SummaryTitle="User-Account-Active"/>
                  <SummaryCard icon={ MdPerson } SummaryTitle="User-Account-InActive"/>
                </div>
                <div className="list-reg-verification">
                    <div className="list-reg-container">
                        <OtherAc/>
                        <OtherAc/>
                        <OtherAc/>
                    </div>
                    <div className="user-reg-form">
                        <FormRegUser/>
                    </div>
                </div>
            </div>

        </div>
    )
}
