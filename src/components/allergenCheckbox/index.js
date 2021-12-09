import React, {useEffect} from 'react';
import styles from "./allergenCheckbox.module.scss"
import PropTypes from "prop-types";
import CELERY from "../../assets/allergies/celery.svg"
import EGGS from "../../assets/allergies/eggs.svg"
import FISH from "../../assets/allergies/fish.svg"
import GLUTEN from "../../assets/allergies/gluten.svg"
import LUPINE from "../../assets/allergies/lupine.svg"
import MILK from "../../assets/allergies/milk.svg"
import MOLLUSCS from "../../assets/allergies/molluscs.svg"
import MUSTARD from "../../assets/allergies/mustard.svg"
import NUTS from "../../assets/allergies/nuts.svg"
import PEANUTS from "../../assets/allergies/peanuts.svg"
import SESAME from "../../assets/allergies/sesame.svg"
import SHELLFISH from "../../assets/allergies/shellfish.svg"
import SULPHITE from "../../assets/allergies/sulphite.svg"
import Disabled from "../../assets/disabled.svg"


export default function AllergenCheckbox(props){

    return(
        <div className={props.disabled ? styles.wrapperDisabled : styles.wrapper} onClick={props.onClick}>
            <div className={styles.imageWrapper}>
                <img src={(props.allergen === "CELERY" && CELERY)
                || (props.allergen === "EGGS" && EGGS)
                || (props.allergen === "FISH" && FISH)
                || (props.allergen === "GLUTEN" && GLUTEN)
                || (props.allergen === "LUPINE" && LUPINE)
                || (props.allergen === "MILK" && MILK)
                || (props.allergen === "MOLLUSCS" && MOLLUSCS)
                || (props.allergen === "MUSTARD" && MUSTARD)
                || (props.allergen === "NUTS" && NUTS)
                || (props.allergen === "PEANUTS" && PEANUTS)
                || (props.allergen === "SESAME" && SESAME)
                || (props.allergen === "SHELLFISH" && SHELLFISH)
                || (props.allergen === "SULPHITE" && SULPHITE)
                } alt={""}/>
                {props.disabled && <img className={styles.disabled} src={Disabled} alt={""}/>}
            </div>
            <p>{props.allergen}</p>
        </div>
    )
}
AllergenCheckbox.propTypes = {
    allergen: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
