import React from 'react';
import styles from './textInput.module.scss';
import Approve from '../../assets/accept.svg';
import Deny from '../../assets/deny.svg';
import PropTypes from 'prop-types';

export default function TextInput(props){


    return(
        <div className={styles.inputWrapper}>
            <div className={styles.label} data-testid={"label"}>{props.label}</div>
            <input className={styles.input} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false" aria-label={props.label} type={props.type}/>
            <i className={styles.icon}>
                {props.icon === "approve" && <img src={Approve} alt={"Approve"}/>}
                {props.icon === "deny" && <img src={Deny} alt={"Deny"}/>}
            </i>
        </div>
    )
}
TextInput.propTypes = {
    label: PropTypes.string,
    valueChange: PropTypes.func,
    type: PropTypes.oneOf(['email', 'text', 'password']).isRequired,
    icon: PropTypes.oneOf(['approve','deny','none'])
}
