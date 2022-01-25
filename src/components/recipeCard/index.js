import React, {useEffect} from 'react';
import styles from './recipeCard.module.scss';
import Difficulty from "../difficulty";
import time from "../../assets/time.svg"
import noImage from "../../assets/no-image.jpg"
import {endpoints} from "../../api/endpoints";
import {useHistory} from "react-router-dom";

export default function RecipeCard(props){

    let history = useHistory();

    const [author, setAuthor] = React.useState("");

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
                    return {
                        "username": "Unknown"
                    }
                }
            })
            .then(json => {
                try{
                    setAuthor(json.username);
                }catch (e) {
                    setAuthor("Unknown");
                }
            })
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
        fetchUsername(props.author);
    },[props.author])

    return(
        <div
            className={styles.wrapper}
            data-testid={"recipeCard"}
            onClick={() => {
            history.push("/recipe/"+props.id)
        }}>
            <img src={props.image === null ? noImage : props.image} alt={props.title}/>
            <div className={styles.textWrapper}>
                <div>
                    <h2 className={styles.title}>{props.title}</h2>
                    <p className={styles.description}>{props.description}</p>
                    {props.cuisine !== "" && <p className={styles.tags}><b>Cuisine:</b> {props.cuisine}</p>}
                    {props.categories !== "" && <p className={styles.tags}><b>Categories:</b> <span>{props.categories.replace(/,/g,", ")}</span></p>}
                </div>
                <div className={styles.infoBar}>
                    <div className={styles.right}>
                        <Difficulty difficulty={props.difficulty}/>
                        <p className={styles.duration}><img className={styles.timeIcon} src={time} alt={""}/><span>{parseTime(props.time)}</span></p>
                    </div>
                    <p className={styles.createdBy}>Created <span>{parseISOTime(props.creationDate)}</span> by {author}</p>
                </div>
            </div>
        </div>
    )
}
