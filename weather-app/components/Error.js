import React from "react";
import styles from '../styles/Home.module.scss';
  
  export default function Error() {
    return (
  <div className={styles.error}>
  ⚠️ Oups ! La ville n'a pas été trouvée.
  </div>
);
}