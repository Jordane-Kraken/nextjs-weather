import React from "react";
import styles from '../styles/loader.module.scss';
  
  export default function Loader() {
    return (
      <>
<div className={styles.loader}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
</div>
<div className={styles.two}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
</div>

<div className={styles.three}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
</div>
</>
    );
}



