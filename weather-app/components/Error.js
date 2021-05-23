import React from "react";
import styles from '../styles/Home.module.scss';
  
  export default function Error({message}) {
    return (
  <div className={styles.error}>
  {message}
  </div>
);
}