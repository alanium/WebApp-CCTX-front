import React, { useState, useEffect } from 'react';
import WorkOrder from '../WorkOrder/WorkOrder';
import styles from './ViewWO.module.css';
import { ImSpinner8 } from 'react-icons/im';

export default function ViewWorkOrder(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when the component mounts
    props.obtenerJSON("view_wo")
      .then(responseData => {
        // Update the local state with the fetched data
        setData(responseData);
        setLoading(false); // Establecer el estado de carga en false cuando se complete la carga
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false); // En caso de error, también establecer el estado de carga en false
      });
  }, [props]);

  return (
    <div className={styles.centeredContainer}>
    <div>
      {loading ? (
        <div className={styles.loadingIcon}>
          <ImSpinner8 className={styles.spin} />
        </div>
      ) : (
        <div className={styles.workOrderGrid}>
          {data.map((workOrder) => (
            <div
              key={workOrder["iD"]}
              className={styles.workOrderCard}
            >
              <WorkOrder
                name={workOrder["Project name"]}
                id={workOrder["iD"]}
                email={workOrder["pm_email"]}
                fullname={workOrder["pm_fullname"]}
                scope={workOrder["scoupe of work"]}
                subcontratist={workOrder["subcontratist"]}
                task={workOrder["task_name"]}
                price={workOrder["total negotiated price"]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
