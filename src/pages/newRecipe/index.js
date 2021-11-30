import React from 'react';
import styles from "./newRecipe.module.scss"
import TextInput from "../../components/textInput";


export default function NewRecipe(){

    return(
        <div className={styles.wrapper}>
            <h1>New Recipe</h1>
            <TextInput label={"Title"}/>
            <TextInput label={"Description"}/>
        </div>
    )
}
