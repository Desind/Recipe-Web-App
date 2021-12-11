import React from 'react';
import styles from "./textCheckbox.module.scss"
import PropTypes from "prop-types";

export default function TextCheckbox(props){

    return(
        <div className={props.selected ? styles.wrapperSelected : styles.wrapper} onClick={props.onClick}>
            <p>{props.text}</p>
        </div>
    )
}
TextCheckbox.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
