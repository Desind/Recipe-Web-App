import React from 'react';
import styles from './formButton.module.scss';
import PropTypes from 'prop-types';

export default function FormButton(props){
    return(
        <button disabled={props.disabled} className={!props.disabled ? styles.button : styles.buttonDisabled} onClick={props.onClick}>
            {props.text}
        </button>
    )
}
FormButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
