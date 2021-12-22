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
                    setAuthor("Unknown");
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

    useEffect(() => {
        fetchUsername(props.author);
    },[])

    return(
        <div className={styles.wrapper} onClick={() => {
            history.push("/recipe/"+props.id)
        }}>
            <img src={props.image === null ? noImage : props.image} alt="asdf"/>
            <div className={styles.textWrapper}>
                <div>
                    <h2 className={styles.title}>{props.title}</h2>
                    <p className={styles.description}>{props.description}</p>
                    {props.cuisine !== "" && <p className={styles.tags}><b>Cuisine:</b> {props.cuisine}</p>}
                    {props.categories !== "" && <p className={styles.tags}><b>Categories:</b> {props.categories.replaceAll(",",", ")}</p>}
                </div>
                <div className={styles.infoBar}>
                    <div className={styles.right}>
                        <Difficulty difficulty={props.difficulty}/>
                        <p className={styles.duration}><img className={styles.timeIcon} src={time} alt={""}/>{parseTime(props.time)}</p>
                    </div>
                    <p className={styles.createdBy}>Created {props.creationDate} by {author}</p>
                </div>
            </div>
        </div>
    )
}
