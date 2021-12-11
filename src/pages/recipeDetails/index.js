import React, {useEffect} from 'react';
import styles from "./recipeDetails.module.scss"
import { useParams } from "react-router-dom";
import {endpoints} from "../../api/endpoints";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from "@material-ui/core/Tooltip";
import Difficulty from "../../components/difficulty";
import time from "../../assets/time.svg";
import {Divider} from "@mui/material";
import AllergenIcon from "../../components/allergenIcon";
import noImage from "../../assets/no-image.jpg"

export default function RecipeDetails(){

    const {id} = useParams();

    const [recipe, setRecipe] = React.useState({});
    const [author, setAuthor] = React.useState("unknown");
    const [loaded, setLoaded] = React.useState(false);

    function fetchRecipe(id){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(endpoints.getRecipe + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                setRecipe(result);
                fetchUsername(result.owner);
                setLoaded(true);
                console.log(result);
            }).catch((e) => {
                console.log(e.toString());
                setRecipe(null);
            })
    }
    function parseISOTime(time){
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (s < 10) {
            s = '0' + s;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (h < 10) {
            h = '0' + h;
        }

        return year + '-' + month + '-' + dt + " " + h + ":" + m + ":" + s;
    }
    function parseTime(duration){
        let h = parseInt(duration/60);
        let m = duration - h*60;
        let htext = "";
        let mtext = "";

        if(h === 5 && m === 15){
            return "5h+"
        }
        if(m !== 0){
            mtext = m + "min";
        }
        if(h !== 0){
            htext = h + "h";
        }

        return htext + " " + mtext;
    }

    function fetchUsername(id){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(endpoints.getUsername + id, requestOptions)
            .then(response => {
                if(response.status === 200){
                    return response.json()
                }else{
                    setAuthor("Unknown");
                }
            })
            .then(json => {
                setAuthor(json.username);
            })
    }

    useEffect(() => {
        fetchRecipe(id);
    },[])

    return(
        <div className={styles.wrapper}>
            {loaded && <>
                <div className={styles.headerWrapper}>
                    <div>
                        <div className={styles.recipeTitle}>{recipe.title}</div>
                        <div className={styles.recipeSubTitle}>Created by {author} at {parseISOTime(recipe.creationDate)} </div>
                    </div>
                    <div className={styles.likeIcon}>
                        <Tooltip title={<span className={styles.tooltip}>Add favourite</span>} arrow>
                            <FavoriteBorderIcon fontSize={"large"}/>
                        </Tooltip>
                        <Tooltip title={<span className={styles.tooltip}>Remove favourite</span>} arrow>
                            <FavoriteIcon fontSize={"large"}/>
                        </Tooltip>
                    </div>
                </div>
                <div className={styles.banner}>
                    <img src={recipe.images !== null ? recipe.images : noImage} alt={recipe.title}/>
                    <div className={styles.paper}>
                        <div className={styles.infoWrapper}>
                            <Difficulty difficulty={recipe.difficulty}/>
                            <p className={styles.duration}><img className={styles.timeIcon} src={time} alt={""}/>{parseTime(recipe.duration)}</p>
                        </div>
                        <div className={styles.cuisine}><b>Cuisine:</b> {recipe.cuisines}</div>
                        <div className={styles.category}><b>Categories:</b> {recipe.categories.toString().replaceAll(",",", ")}</div>
                        <Divider/>
                        <div className={styles.description}>{recipe.description}</div>
                        <Divider/>
                        <div className={styles.allergensWrapper}>
                            <p className={styles.allergens}>Allergens:</p>
                            <div className={styles.allergyBlock}>
                                <AllergenIcon allergen={"EGGS"}/>
                                <AllergenIcon allergen={"MILK"}/>
                                <AllergenIcon allergen={"CELERY"}/>
                                <AllergenIcon allergen={"FISH"}/>
                                <AllergenIcon allergen={"FISH"}/>
                                <AllergenIcon allergen={"FISH"}/>
                                <AllergenIcon allergen={"FISH"}/>
                                <AllergenIcon allergen={"FISH"}/>
                                <AllergenIcon allergen={"FISH"}/>
                                <AllergenIcon allergen={"FISH"}/>
                                <AllergenIcon allergen={"FISH"}/>
                                <AllergenIcon allergen={"FISH"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}
