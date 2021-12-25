import React, {useEffect} from 'react';
import styles from "./recipeDetails.module.scss"
import {useHistory, useParams} from "react-router-dom";
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
import AlertDialog from "../../components/alertDialog";
import {toast} from "react-toastify";

export default function RecipeDetails(){

    const {id} = useParams();

    let history = useHistory();

    const [recipe, setRecipe] = React.useState({});
    const [author, setAuthor] = React.useState("unknown");
    const [loaded, setLoaded] = React.useState(false);


    const [disableFav, setDisableFav] = React.useState(false);
    const [favouriteRecipes, setFavouriteRecipes] = React.useState([]);

    const [recommendedRecipes, setRecommendedRecipes] = React.useState([]);

    let [dialogOpen, setDialogOpen] = React.useState(false);

    const token = useGlobalState("token")[0];
    const userId = useGlobalState("userId")[0];
    const userRole = useGlobalState("userRole")[0];

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

    function fetchRecommendedRecipes(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(endpoints.getRecipesQuery+"?title=&allergens=&categories="+recipe.categories.toString()+"&cuisines=&page=1&pageSize=6", requestOptions)
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }else return [];
            }).then(result => {
                console.log(result.recipes);
                setRecommendedRecipes(result.recipes);
            }
        )
    }

    function deleteRecipe(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+ token);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(endpoints.deleteRecipe+id, requestOptions)
            .then(response => {
                if(response.status === 200){
                    toast.success('Recipe deleted successfully.', {
                        position: "bottom-right",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history.replace("/");
                }else{
                    toast.error('Could not delete recipe', {
                        position: "bottom-right",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })

    }

    useEffect(() => {
        fetchRecipe(id);
        if(userId !== ""){
            fetchFavouriteRecipes();
        }
    },[]);
    useEffect(() => {
        if(loaded===true){
            fetchRecommendedRecipes();
        }
    },[loaded]);


    return(
        <div className={styles.wrapper}>
            <AlertDialog
                title={"Are you sure you want to delete this recipe?"}
                description={"This operation cannot be undone"}
                open={dialogOpen}
                onAction={() => {
                    deleteRecipe();
                    setDialogOpen(false);
                }}
                actionName={"Delete"}
                onClose={() => {
                    setDialogOpen(false);
                }}
            />
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
                                {!disableFav ? <Tooltip enterDelay={300} enterNextDelay={300} title={<span className={styles.tooltip}>Remove from favourite</span>} arrow>
                                    <FavoriteIcon onClick={() => {dislikeRecipe()}} fontSize={"large"}/>
                                </Tooltip> : <FavoriteIcon fontSize={"large"}/>}
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.ownerPanel}>
                    {userId === recipe.owner && <div onClick={() => {history.push("/edit/"+recipe.id)}}>Edit</div>}
                    {(userRole === "ADMIN" || userId === recipe.owner) && <div onClick={() => {setDialogOpen(true)}}>Delete</div>}
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
                {recommendedRecipes.length > 1 && <div className={styles.recommended}>
                    <p className={styles.blockTitle}>Recommended recipes</p>
                    <div className={styles.recommendedWrapper}>
                        {recommendedRecipes.map((item,number) => {
                            if(item.id === recipe.id) return;
                            return(
                                <div key={number} className={styles.recommendedRecipe} onClick={() => {
                                    setLoaded(false);
                                    fetchRecipe(item.id);
                                    history.push("/recipe/"+item.id);
                                }}>
                                    <p className={styles.recommendedRecipeTitle}>{item.title}</p>
                                    <img className={styles.recommendedRecipeImage} alt={""} src={item.images}/>
                                    <div className={styles.infoWrapper}>
                                        <Difficulty difficulty={item.difficulty}/>
                                        <p className={styles.duration}><img className={styles.timeIcon} src={time} alt={""}/>{parseTime(item.duration)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>}
            </>}
        </div>
    )
}
