import styles from "./customerlist.module.css";
export const CustomerList = () => {
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
          <tr>
            <td>1</td>
            <td>Issa mwanga</td>
            <td>Kilimanjaro</td>
            <td>255744010257</td>
            <td>None</td>
            <td>Nov 12, 2025</td>
            <td>view</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
