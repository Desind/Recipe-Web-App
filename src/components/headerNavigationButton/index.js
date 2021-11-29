import React from 'react';
import styles from './headerNavigationButton.module.scss';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';


export default function HeaderNavigationButton(props){

    return(
        <NavLink className={styles.link} exact title={props.label} to={props.link} activeClassName={styles.active}>{props.label}</NavLink>
    )
}

HeaderNavigationButton.propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}
