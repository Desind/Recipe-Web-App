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
import noImage from "../../assets/no-image.jpg";
import _ from "lodash";
import {useGlobalState} from "../../state";

export default function RecipeDetails(){

    const {id} = useParams();

    const [recipe, setRecipe] = React.useState({});
    const [author, setAuthor] = React.useState("unknown");
    const [loaded, setLoaded] = React.useState(false);


    const [disableFav, setDisableFav] = React.useState(false);
    const [favouriteRecipes, setFavouriteRecipes] = React.useState([]);

    const token = useGlobalState("token")[0];
    const userId = useGlobalState("userId")[0];

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

    function fetchFavouriteRecipes(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(endpoints.getFavouriteRecipes + userId, requestOptions)
            .then(response => response.json())
            .then(result => {
                setFavouriteRecipes(result.favouriteRecipes);
                setDisableFav(false);
            })
    }

    function likeRecipe(){
        setDisableFav(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(endpoints.likeRecipe + id, requestOptions)
            .then(response => {
                if(response.status === 200){
                    fetchFavouriteRecipes();
                }
            })


    }
    function dislikeRecipe(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(endpoints.dislikeRecipe + id, requestOptions)
            .then(response => {
                if(response.status === 200){
                    fetchFavouriteRecipes();
                }
            })
    }

    useEffect(() => {
        fetchRecipe(id);
        if(userId !== ""){
            fetchFavouriteRecipes();
        }
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
                        {(userId !== "" && !favouriteRecipes.includes(id)) &&
                            <div className={!disableFav ? styles.favButton : styles.favButtonDisabled} disabled={disableFav} >
                                {!disableFav ? <Tooltip enterDelay={300} enterNextDelay={300} title={<span className={styles.tooltip}>Add favourite</span>} arrow>
                                    <FavoriteBorderIcon onClick={() => {likeRecipe()}} fontSize={"large"}/>
                                </Tooltip> : <FavoriteBorderIcon fontSize={"large"}/>}
                            </div>
                        }
                        {(userId !== "" && favouriteRecipes.includes(id)) &&
                            <div className={!disableFav ? styles.favButton : styles.favButtonDisabled} disabled={disableFav}>
                                {!disableFav ? <Tooltip enterDelay={300} enterNextDelay={300} title={<span className={styles.tooltip}>Remove favourite</span>} arrow>
                                    <FavoriteIcon onClick={() => {dislikeRecipe()}} fontSize={"large"}/>
                                </Tooltip> : <FavoriteIcon fontSize={"large"}/>}
                            </div>
                        }
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
                                {_.orderBy(recipe.allergens).map((item) => {
                                    return <AllergenIcon allergen={item}/>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.ingredientsWrapper}>
                    <p className={styles.ingredientsTitle}>Ingredients</p>
                    <div className={styles.ingredientsContainer}>
                        {recipe.ingredients.map((item) => {
                          return(
                              <div className={styles.ingredient}>{item}</div>
                          )
                        })}
                    </div>
                </div>
                <div className={styles.recipeWrapper}>
                    <p className={styles.recipeStepTitle}>Steps</p>
                    <div className={styles.ingredientsContainer}>
                        {recipe.steps.map((item) => {
                          return(
                              <div className={styles.recipeStep}>{item}</div>
                          )
                        })}
                    </div>
                </div>
            </>}
        </div>
    )
}
