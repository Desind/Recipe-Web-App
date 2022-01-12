import React, {useEffect} from 'react';
import styles from "./recommendedRecipes.module.scss"
import { useHistory } from "react-router-dom";
import {endpoints} from "../../api/endpoints";
import {useGlobalState} from "../../state";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecipeCard from "../../components/recipeCard";
import Pagination from "@mui/material/Pagination";

export default function RecommendedRecipes(){

    let history = useHistory();
    let [favouriteRecipes, setFavouriteRecipes] = React.useState(null);
    let [loading, setLoading] = React.useState(true);


    const [fetchedRecipes, setFetchedRecipes] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(0);
    const [paginationDisabled, setPaginationDisabled] = React.useState(false);

    const token = useGlobalState('token')[0];

    function fetchUserProfile(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(endpoints.getUserProfile, requestOptions)
            .then(response => response.json())
            .then(async result => {
                setFavouriteRecipes(result.favouriteRecipes);
            })
    }

    function fetchRecommendedRecipes(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/recommend-recipes?page="+page+"&pageSize=8", requestOptions)
            .then(response => response.json())
            .then(result => {
                setFetchedRecipes(result.recipes);
                setPageCount(result.pageCount);
                console.log(result.recipes);
                setPage(result.page);
                setPaginationDisabled(false);
                setLoading(false);
            });
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

    useEffect(() => {
        if (token !== "") {
            fetchUserProfile();
            fetchRecommendedRecipes();
        } else {
            history.replace("/");
        }
    },[]);
    useEffect(() => {
        console.log(page);
        fetchRecommendedRecipes();
    },[page]);


    return(
        <div className={styles.wrapper}>
            {loading && <div className={styles.loadingWrapper}>
                <p>Analysing Your preferences</p>
                <CircularProgress size={200} thickness={1} style={{'color': '#E69F1E'}}/>
            </div>}
            {(!loading && fetchedRecipes.length>0) && <div className={styles.recommendedRecipes}>
                <h1>Recipes recommended for you</h1>
                {fetchedRecipes.map((item,key) => {
                    return(
                        <RecipeCard
                            key={key}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            cuisine={item.cuisines.toString()}
                            categories={item.categories.toString()}
                            difficulty={item.difficulty}
                            image={item.images}
                            time={item.duration}
                            author={item.owner}
                            creationDate={parseISOTime(item.creationDate)}
                        />
                    )
                })}
                <div className={styles.paginationWrapper}>
                    {pageCount>1 && <Pagination onChange={(e,v) => {
                        setPage(v);
                    }}  disabled={paginationDisabled} style={{marginTop: "30px"}} size="large" shape="rounded" count={pageCount} />}
                </div>
            </div>}
            {(!loading && fetchedRecipes.length === 0) && <div className={styles.noRecommended}>
                <p className={styles.noRecommendedTitle}>You have no recommended recipes.</p>
                <p className={styles.noRecommendedSubtitle}>Please like more recipes and come back here later.</p>
            </div>}
        </div>
    )
}
