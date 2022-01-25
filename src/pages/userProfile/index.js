import React, {useEffect, useRef} from 'react';
import styles from "./userProfile.module.scss"
import { useGlobalState } from "../../state";
import {toast} from "react-toastify";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { endpoints } from "../../api/endpoints";
import noImage from "../../assets/no-image.jpg"
import {PhotoCamera} from "@mui/icons-material";
import RecipeCard from "../../components/recipeCard";
import _ from "lodash";

export default function UserProfile(){

    let history = useHistory();

    let [activeTab, setActiveTab] = React.useState("profile");
    let [userProfile, setUserProfile] = React.useState(null);

    let [favouriteRecipes, setFavouriteRecipes] = React.useState([]);

    let [ownedRecipes, setOwnedRecipes] = React.useState([]);

    const [image, setImage] = React.useState(null);
    const imageRef = useRef(null);

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
            .then(result => {
                console.log(result);
                setUserProfile(result);
                fetchFavouriteRecipes(result.favouriteRecipes);
                fetchUserRecipes(result.id);
                setImage(result.image);
            })
    }
    function uploadImage(file) {
        let reader = new FileReader();
        try{
            reader.readAsDataURL(file);
            reader.onload = function () {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "image": reader.result
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(endpoints.uploadUserImage, requestOptions).then(() => {
                    setImage(reader.result);
                    console.log(reader.result.length);
                });
            };
        }catch (e){

        }
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

    function fetchFavouriteRecipes(favouriteRecipes){
        setFavouriteRecipes([]);
        if(favouriteRecipes === null){
            return;
        }
        favouriteRecipes.map((item) => {
            console.log(item);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch(endpoints.getRecipe + item, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    setFavouriteRecipes(favouriteRecipes => [...favouriteRecipes, json]);
                })
        })
    }

    function fetchUserRecipes(id){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(endpoints.getUserRecipes + id, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                setOwnedRecipes(_.reverse(json));
            })
    }

    useEffect(() => {
        if(token !== ""){
            fetchUserProfile();
        }else{
            history.replace("/");
        }
    },[]);

    return(
        <div className={styles.wrapper}>
            <div className={styles.wrapperLeft}>
                <h1 className={styles.header}>User profile</h1>
                <div
                    className={activeTab === "profile" ? styles.tabButtonActive : styles.tabButton}
                    onClick={() => {
                        setActiveTab("profile");
                    }}
                >User profile</div>
                <div
                    className={activeTab === "recipes" ? styles.tabButtonActive : styles.tabButton}
                    onClick={() => {
                        setActiveTab("recipes");
                    }}
                >Favourite recipes {favouriteRecipes.length>0 && <span className={styles.favRecipesCount}>({favouriteRecipes.length})</span>}</div>
                <div
                    className={activeTab === "owned" ? styles.tabButtonActive : styles.tabButton}
                    onClick={() => {
                        setActiveTab("owned");
                    }}
                >Created recipes {ownedRecipes.length>0 && <span className={styles.favRecipesCount}>({ownedRecipes.length})</span>}</div>

            </div>
            <div className={styles.wrapperRight}>
                {(activeTab === "profile" && userProfile !== null) && <div className={styles.content}>
                    <h2 className={styles.userInfoHeader}>User info</h2>
                    <div className={styles.userWrapper}>
                        <div className={styles.imageContainer}>
                            <img
                                onClick={e => {
                                    imageRef.current.click();
                                }}
                                className={styles.imageBox}
                                src={image === null ? noImage : image}
                                alt={""}/>
                            <input
                                style={{display: "none"}}
                                onChange={e => uploadImage(e.target.files[0])}
                                ref={imageRef}
                                type="file"
                                accept="image/jpg, image/jpeg, image/png, image/webp"
                                name="photo"
                                id="upload-photo"
                            />
                            <div className={styles.imageIcon}>
                                <PhotoCamera fontSize={"large"}/>
                            </div>
                        </div>
                        <div className={styles.userInfoWrapper}>
                            <div className={styles.username}>{userProfile.username}</div>
                            <div className={styles.email}>{userProfile.email}</div>
                            <div className={styles.registrationDate}>Registration date: {parseISOTime(userProfile.registrationDate)}</div>
                            {userProfile.userRoles.includes("ADMIN") && <div className={styles.userRole}>Administrator account</div>}
                        </div>
                    </div>
                </div>}
                {activeTab === "recipes" && <div className={styles.recipesWrapper}>
                    {favouriteRecipes.map((item, key) => {
                        return (
                            <RecipeCard
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                cuisine={item.cuisines.toString()}
                                categories={item.categories.toString()}
                                difficulty={item.difficulty}
                                image={item.images}
                                time={item.duration}
                                author={item.owner}
                                creationDate={item.creationDate}
                            />
                        )
                    })}
                </div>}
                {activeTab === "owned" && <div className={styles.recipesWrapper}>
                    {ownedRecipes.map((item, key) => {
                        return (
                            <RecipeCard
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                cuisine={item.cuisines.toString()}
                                categories={item.categories.toString()}
                                difficulty={item.difficulty}
                                image={item.images}
                                time={item.duration}
                                author={item.owner}
                                creationDate={item.creationDate}
                            />
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}
