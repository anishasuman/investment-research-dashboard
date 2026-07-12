"use client";

import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner(){

return(

<div className={styles.loaderContainer}>

<div className={styles.loader}></div>

<p>Analyzing company...</p>

</div>

);

}