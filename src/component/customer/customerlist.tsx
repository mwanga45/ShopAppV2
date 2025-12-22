import type React from "react";
import styles from "./customerlist.module.css";
import type { CustomerInfoCollection } from "../../type.interface";
import { PiDotsThreeCircle } from "react-icons/pi";
import { DateFormat } from "../../format.helper";
export const CustomerList: React.FC<CustomerInfoCollection> = ({
  CustomerDetails,
}) => {
  return (
    <div>
      <table className={styles.customerlisttable}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>CustomerName</th>
            <th>Location</th>
            <th>Phone Number</th>
            <th>Debt-status</th>
            <th>RegisteredAt</th>
            <th>View More details</th>
          </tr>
        </thead>
        <tbody>
          {CustomerDetails ? (
            CustomerDetails.length > 0 ? (
              CustomerDetails.map((i, index) => (
                <tr key={i.customerName}>
                  <td>{`C.${(index + 1).toString().padStart(3, "0")}`}</td>
                  <td>{i.customerName}</td>
                  <td>{i.location}</td>
                  <td>+{i.Dial}</td>
                  <td>{i.DebtStatus ?'exist':'not exist'}</td>
                  <td>{DateFormat(i.RegisteredAt ?? '')}</td>
                  <td>
                    <PiDotsThreeCircle size={36} enableBackground={2} color="yellow" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>No CustomerInfo</tr>
            )
          ) : (
            <tr>No Information returned</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
