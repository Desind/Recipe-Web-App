import React from 'react';
import styles from "./contentWrapper.module.scss"


export default function ContentWrapper(props){

    return(
        <div className={styles.wrapper}>
            {props.children}
        </div>
    )
}
