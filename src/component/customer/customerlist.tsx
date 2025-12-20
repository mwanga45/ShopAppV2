import styles from './customerlist.module.css'
export const CustomerList = () => {
  return (
    <div>
      <table className={styles.customerlisttable}>
        <thead>
          <tr>
            <td>S/N</td>
            <td>CustomerName</td>
            <td>Location</td>
            <td>Phone Number</td>
            <td>Debt-status</td>
            <td>RegisteredAt</td>
            <td>View More details</td>
          </tr>
        </thead>
        <tbody>
            <tr>
                
            </tr>
        </tbody>
      </table>
    </div>
  );
};
