import React from 'react';
import styles from './formButton.module.scss';
import PropTypes from 'prop-types';

export default function FormButton(props){
    return(
        <button className={styles.button} onClick={props.onClick}>
            {props.text}
        </button>
    )
}
FormButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
