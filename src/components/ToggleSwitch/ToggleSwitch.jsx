import React, { useState } from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = (props)=> {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    props.setShowMaster(!isChecked)
    console.log(isChecked)
  };

  return (
    <div className={styles['toggle-switch']}>
      <input
        type="checkbox"
        className={styles['toggle-switch-checkbox']}
        checked={isChecked}
        onChange={handleToggle}
      />
      <label onClick={handleToggle} className={styles['toggle-switch-label']}>
        <span className={styles['toggle-switch-inner']} />
        <span className={styles['toggle-switch-switch']} />
      </label>
    </div>
  );
}

export default ToggleSwitch;