import {jwtDecode }from "jwt-decode"; 
import "./account.css";
import { PiUserCircleDashedFill } from "react-icons/pi";

interface TokenPayload {
  sub: string | null;
  email: string | null;
  role: string | null;
  fullname:string |null
}

export const Accountbar = () => {
  const token = localStorage.getItem("access_token");
  let userInfo: TokenPayload | null = null;
  if (token) {
    userInfo = jwtDecode<TokenPayload>(token);
  }
  console.log(userInfo);
  return (
    <div className="ac-container">
      <div className="avator">
        <PiUserCircleDashedFill color="pink" size={40} />  
      </div>
      <div className="acc-details">
        <p className="acc-name">{userInfo?.fullname?? "Guest"}</p>
        <p className="acc-email">{userInfo?.email ?? "Not logged in"}</p>
        <p className="acc-email">{userInfo?.role ?? "Invited"}</p>
      </div>
    </div>
  );
};
