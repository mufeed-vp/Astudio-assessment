import React from 'react';
import Table from 'react-bootstrap/Table';
import { useUserContext } from '../ApiContext';
import styles from './stlyles/TableComponent.module.scss'; // Import the styles

const TableComponent = () => {
  const { userData } = useUserContext();

  if (!userData || userData.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className={styles.tableResponsive}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {Object.keys(userData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((item, index) => (
            <tr key={index} className={styles.tableRow}>
              {Object.values(item).map((value, index) => (
                <td key={index} className={styles.tableCell}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
