import React from 'react';
import styles from './headerNavigationButton.module.scss';
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'


export default function HeaderNavigationButton(props){
    let history = useHistory();
    const location = useLocation();
    return(
        <div
            className={location.pathname !== props.link ? styles.link : styles.active}
            onClick={() => {
                history.push(props.link);
            }}
            aria-label={"navigationButton"}
        >
            {props.label}
        </div>
    )
}

HeaderNavigationButton.propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}
