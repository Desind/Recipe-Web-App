import React from 'react';
import styles from './recipeCard.module.scss';
import Difficulty from "./difficulty";
import time from "../../assets/time.svg"
import noImage from "../../assets/no-image.jpg"

export default function RecipeCard(props){
    return(
        <div className={styles.wrapper}>
            <img src={props.image === "" ? noImage : props.image} alt="asdf"/>
            <div className={styles.textWrapper}>
                <div>
                    <h2 className={styles.title}>{props.title}</h2>
                    <p className={styles.description}>{props.description}</p>
                    <p className={styles.tags}>Cuisine: {props.cuisine}</p>
                    <p className={styles.tags}>Categories: {props.categories}</p>
                </div>
                <div className={styles.infoBar}>
                    <div className={styles.right}>
                        <Difficulty difficulty={props.difficulty}/>
                        <p className={styles.duration}><img className={styles.timeIcon} src={time} alt={""}/>{props.time} min</p>
                    </div>
                    <p className={styles.createdBy}>Created {props.creationDate} by {props.author}</p>
                </div>
            </div>
        </div>
    )
}
