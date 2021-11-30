import React from 'react';
import styles from "./homepage.module.scss"
import RecipeCard from "../../components/recipeCard";


export default function Homepage(){

    return(
        <div className={styles.wrapper}>
            <RecipeCard
                title={"Chlyb z masłem"}
                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis mollitia nulla obcaecati odit perferendis qui rem velit. Adipisci, aspernatur, atque cupiditate ducimus, ea libero non nulla praesentium quas repellendus sequi."}
                cuisine={"Italian"}
                categories={"Vegan, Pasta"}
                difficulty={"AVERAGE"}
                image={"https://reciperoulette.tv/public/upload/0842edc33227312218714a542d499096.jpg"}
                time={"65"}
                author={"Desind"}
                creationDate={"20.11.2021"}
            />
            <RecipeCard
                title={"Chlyb z masłem"}
                description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis mollitia nulla obcaecati odit perferendis qui rem velit. Adipisci, aspernatur, atque cupiditate ducimus, ea libero non nulla praesentium quas repellendus sequi."}
                cuisine={"Italian"}
                categories={"Vegan, Pasta"}
                difficulty={"HARD"}
                image={""}
                time={"65"}
                author={"Desind"}
                creationDate={"20.11.2021"}
            />
        </div>
    )
}
