import React, {useEffect, useRef} from 'react';
import styles from "./editRecipe.module.scss"
import RecipeTextInput from "../../components/recipeTextInput";
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PhotoCamera} from "@mui/icons-material";
import noImage from "../../assets/no-image.jpg"
import FormButton from "../../components/FormButton";
import Celery from "../../assets/allergies/celery.svg"
import Eggs from "../../assets/allergies/eggs.svg"
import Fish from "../../assets/allergies/fish.svg"
import Gluten from "../../assets/allergies/gluten.svg"
import Lupine from "../../assets/allergies/lupine.svg"
import Milk from "../../assets/allergies/milk.svg"
import Molluscs from "../../assets/allergies/molluscs.svg"
import Mustard from "../../assets/allergies/mustard.svg"
import Nuts from "../../assets/allergies/nuts.svg"
import Peanuts from "../../assets/allergies/peanuts.svg"
import Sesame from "../../assets/allergies/sesame.svg"
import Shellfish from "../../assets/allergies/shellfish.svg"
import Sulphite from "../../assets/allergies/sulphite.svg"
import { endpoints } from "../../api/endpoints";
import _ from 'lodash';
import { useGlobalState } from "../../state"
import {useHistory, useParams} from "react-router-dom";
import {toast} from "react-toastify";


export default function EditRecipe(){

    const imageRef = useRef(null);

    const {id} = useParams();

    const [allCategories, setAllCategories] = React.useState([]);
    const [selectedCategories, setSelectedCategories] = React.useState([]);

    const [allCuisines, setAllCuisines] = React.useState([]);
    const [selectedCuisines, setSelectedCuisines] = React.useState([]);

    const [selectedAllergies, setSelectedAllergies] = React.useState([]);

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    const [ingredients, setIngredients] = React.useState([""]);
    const [recipeSteps, setRecipeSteps] = React.useState([""]);

    const [image, setImage] = React.useState(null);

    const [duration, setDuration] = React.useState(15);

    const [difficulty, setDifficulty] = React.useState('3');

    const [sendDisabled, setSendDisabled] = React.useState(false);

    const token = useGlobalState('token')[0];
    const userId = useGlobalState('userId')[0];

    const history = useHistory();

    const [recipe, setRecipe] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);

    /* eslint-disable */
    function fetchCategories(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(endpoints.getCategories, requestOptions)
            .then(response => response.json())
            .then(result => {
                setAllCategories(_.sortBy(result));

            })
            .catch(error => console.log('error', error));
        return [];
    }

    function fetchCuisines(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(endpoints.getCuisines, requestOptions)
            .then(response => response.json())
            .then(result => {
                setAllCuisines(_.sortBy(result));
            })
        return [];
    }

    function allergyClick(allergy){
        if(!selectedAllergies.includes(allergy)){
            setSelectedAllergies([...selectedAllergies, allergy]);
        }else{
            setSelectedAllergies([...selectedAllergies].filter(function(item) {return item !== allergy}))
        }
    }

    function ingredientChange(value, id){
        let array = [...ingredients];
        array[id] = value;
        setIngredients(array);
    }

    function recipeStepsChange(value, id){
        let array = [...recipeSteps];
        array[id] = value;
        setRecipeSteps(array);
    }

    function uploadImage(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        try{
            reader.onload = function () {
                setImage(reader.result);
            };
        }catch (e){

        }
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

    function parseDifficulty(dif){
        switch (dif){
            case '1': {
                return "BEGGINER";
            }
            case '2': {
                return "EASY";
            }
            case '3': {
                return "AVERAGE";
            }
            case '4': {
                return "ADVANCED";
            }
            case '5': {
                return "HARD";
            }
        }
    }
    function parseDifficultyToNumber(dif){
        switch (dif){
            case 'BEGGINER': {
                return "1";
            }
            case 'EASY': {
                return "2";
            }
            case 'AVERAGE': {
                return "3";
            }
            case 'ADVANCED': {
                return "4";
            }
            case 'HARD': {
                return "5";
            }
            default:{
                return "3";
            }
        }
    }

    function editRecipe(){
        setSendDisabled(true);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        let img = null;
        try {
            img = [image.toString()]
        }catch (e){

        }
        var raw = JSON.stringify({
            "title": title,
            "description": description,
            "ingredients": ingredients,
            "steps": recipeSteps,
            "allergens": selectedAllergies,
            "categories": selectedCategories,
            "cuisines": selectedCuisines,
            "duration": duration,
            "images": img,
            "difficulty": parseDifficulty(difficulty)
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(endpoints.editRecipe, requestOptions)
            .then(response => {
                if(response.status === 201){
                    return response.json();
                }else{
                    toast.error('Could not modify recipe. Try again later.', {
                        position: "bottom-right",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setSendDisabled(false);
                    return null;
                }
            }).then(json => {
            if(json !== null){
                toast.success('Recipe modified successfully.', {
                    position: "bottom-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push('/recipe/'+json.id);
            }
        })
    }

    function fetchRecipe(id){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(endpoints.getRecipe + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.owner != userId){
                    history.replace("/");
                    return;
                }
                setRecipe(result);
                setLoaded(true);
                setTitle(result.title);
                setDescription(result.description);
                setIngredients(result.ingredients);
                setRecipeSteps(result.steps);
                setSelectedAllergies(result.allergens);
                setSelectedCategories(result.categories);
                setSelectedCuisines(result.cuisines);
                setImage(result.images);
                setDuration(result.duration);
                setDifficulty(parseDifficultyToNumber(result.difficulty));
                console.log(result);
            }).catch((e) => {
            console.log(e.toString());
        })
    }

    useEffect(() => {
        fetchCategories();
        fetchCuisines();
        fetchRecipe(id);
    },[]);

    return(
        <div className={styles.wrapper}>
            <h1>Edit recipe</h1>
            <div className={styles.label}>Title</div>
            <RecipeTextInput value={title} type={"line"} valueChange={setTitle}/>

            <div className={styles.label}>Description</div>
            <RecipeTextInput value={description} type={"multiline"} valueChange={setDescription}/>

            <div className={styles.label}>Ingredients</div>
            {ingredients.map((item,id) => {
                return(
                    id === 0 ?
                        (
                            ingredients.length < 2 ?
                                <RecipeTextInput
                                    type={"line"}
                                    value={ingredients[id]}
                                    valueChange={ingredientChange}
                                    array={true}
                                    index={id}
                                /> :
                                <RecipeTextInput
                                    type={"removableLine"}
                                    valueChange={ingredientChange}
                                    value={ingredients[id]}
                                    array={true}
                                    index={id}
                                    onRemoveLine={() => {
                                        let array = [...ingredients];
                                        array.splice(id,1);
                                        setIngredients(array);
                                    }}
                                />
                        ):(
                            <RecipeTextInput
                                type={"removableLine"}
                                valueChange={ingredientChange}
                                value={ingredients[id]}
                                array={true}
                                index={id}
                                onRemoveLine={() => {
                                    let array = [...ingredients];
                                    array.splice(id,1);
                                    setIngredients(array);
                                }}
                            />
                        )

                )
            })}
            <div className={styles.addButtonWrapper}>
                <AddIcon
                    className={styles.addButton}
                    fontSize={"large"}
                    onClick={() => {
                        setIngredients([...ingredients,""])
                    }}/>
            </div>

            <div className={styles.label}>Recipe steps</div>
            {recipeSteps.map((item,id) => {
                return(
                    id === 0 ?
                        (
                            recipeSteps.length < 2 ?
                                <RecipeTextInput
                                    type={"multiline"}
                                    value={recipeSteps[id]}
                                    valueChange={recipeStepsChange}
                                    array={true}
                                    index={id}
                                />
                                :
                                <RecipeTextInput
                                    type={"removableMultiline"}
                                    valueChange={recipeStepsChange}
                                    value={recipeSteps[id]}
                                    array={true}
                                    index={id}
                                    onRemoveLine={() => {
                                        console.log(id);
                                        let array = [...recipeSteps];
                                        array.splice(id,1);
                                        setRecipeSteps(array);
                                    }}
                                />

                        ):(
                            <RecipeTextInput
                                type={"removableMultiline"}
                                valueChange={recipeStepsChange}
                                value={recipeSteps[id]}
                                array={true}
                                index={id}
                                onRemoveLine={() => {
                                    console.log(id);
                                    let array = [...recipeSteps];
                                    array.splice(id,1);
                                    setRecipeSteps(array);
                                }}
                            />
                        )

                )
            })}
            <div className={styles.addButtonWrapper}>
                <AddIcon
                    className={styles.addButton}
                    fontSize={"large"}
                    onClick={() => {
                        setRecipeSteps([...recipeSteps,""])
                    }}
                />
            </div>

            {/*Allergens*/}
            <div className={styles.accordionWrapper}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        className={styles.accordionSummary}
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <div className={styles.accordionLabel}>Allergens {selectedAllergies.length>0 && <p>({selectedAllergies.length})</p>}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.allergyWrapper}>
                            <div
                                className={!selectedAllergies.includes("CELERY") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("CELERY")}}
                            >
                                <img src={Celery} alt={""}/>
                                <p>CELERY</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("EGGS") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("EGGS")}}
                            >
                                <img src={Eggs} alt={""}/>
                                <p>EGGS</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("FISH") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("FISH")}}
                            >
                                <img src={Fish} alt={""}/>
                                <p>FISH</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("GLUTEN") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("GLUTEN")}}
                            >
                                <img src={Gluten} alt={""}/>
                                <p>GLUTEN</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("LUPINE") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("LUPINE")}}
                            >
                                <img src={Lupine} alt={""}/>
                                <p>LUPINE</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("MILK") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("MILK")}}
                            >
                                <img src={Milk} alt={""}/>
                                <p>MILK</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("MOLLUSCS") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("MOLLUSCS")}}
                            >
                                <img src={Molluscs} alt={""}/>
                                <p>MOLLUSCS</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("MUSTARD") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("MUSTARD")}}
                            >
                                <img src={Mustard} alt={""}/>
                                <p>MUSTARD</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("NUTS") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("NUTS")}}
                            >
                                <img src={Nuts} alt={""}/>
                                <p>NUTS</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("PEANUTS") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("PEANUTS")}}
                            >
                                <img src={Peanuts} alt={""}/>
                                <p>PEANUTS</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("SESAME") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("SESAME")}}
                            >
                                <img src={Sesame} alt={""}/>
                                <p>SESAME</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("SHELLFISH") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("SHELLFISH")}}
                            >
                                <img src={Shellfish} alt={""}/>
                                <p>SHELLFISH</p>
                            </div>
                            <div
                                className={!selectedAllergies.includes("SULPHITE") ? styles.allergy : styles.allergySelected}
                                onClick={() => {allergyClick("SULPHITE")}}
                            >
                                <img src={Sulphite} alt={""}/>
                                <p>SULPHITE</p>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

            {/*Categories*/}
            <div className={styles.accordionWrapper}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        className={styles.accordionSummary}
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <div className={styles.accordionLabel}>
                            Categories {selectedCategories.length>0 && <p>({selectedCategories.length})</p>}
                            <p style={{fontWeight: "bold"}}>{selectedCategories.length > 2 && "MAX"}</p>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.cuisineWrapper}>
                            {allCategories.map((element) => {
                                return(
                                    <div
                                        className={!selectedCategories.includes(element) ? styles.selectable : styles.selectableSelected}
                                        onClick={() => {
                                            if(!selectedCategories.includes(element) && selectedCategories.length<3){
                                                setSelectedCategories([...selectedCategories, element]);
                                            }else{
                                                setSelectedCategories([...selectedCategories].filter(function(item) {return item !== element}))
                                            }
                                        }}
                                    >
                                        <p>{element}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

            {/*Cuisine*/}
            <div className={styles.accordionWrapper}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        className={styles.accordionSummary}
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <div className={styles.accordionLabel}>Cuisine {<p>{selectedCuisines[0]}</p>}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.cuisineWrapper}>
                            {allCuisines.map((element) => {
                                return(
                                    <div
                                        className={!selectedCuisines.includes(element) ? styles.selectable : styles.selectableSelected}
                                        onClick={() => {
                                            if(selectedCuisines.includes(element)){
                                                setSelectedCuisines([]);
                                            }else{
                                                setSelectedCuisines([...selectedCuisines].filter(function(item) {return item !== element}));
                                                setSelectedCuisines([element]);
                                            }
                                        }}
                                    >
                                        <p>{element}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className={styles.durationHeader}>
                <div className={styles.label}>Add image</div>
            </div>
            <div className={styles.imageContainer}>
                <img
                    onClick={e => {
                        imageRef.current.click();
                    }}
                    className={styles.imageBox}
                    src={image !== null ? image : noImage}
                    alt={""}/>
                <input
                    style={{ display: "none" }}
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

            <div className={styles.durationHeader}>
                <div className={styles.label}>Duration</div>
                <p>{parseTime(duration)}</p>
            </div>
            <div className={styles.sliderWrapper}>
                <input
                    className={styles.slider}
                    type="range"
                    min="15"
                    max="315"
                    value={duration}
                    step="15"
                    onChange={(e) => {
                        setDuration(parseInt(e.target.value));
                    }}
                />
            </div>

            <div className={styles.durationHeader}>
                <div className={styles.label}>Difficulty</div>
                <p>{parseDifficulty(difficulty)}</p>
            </div>
            <div className={styles.sliderWrapper}>
                <input
                    value={difficulty}
                    className={styles.slider}
                    type="range"
                    min="1"
                    max="5"
                    onChange={(event => {
                        setDifficulty(event.target.value);
                    })}
                />
            </div>

            <div className={styles.buttonWrapper}>
                <FormButton disabled={sendDisabled} text={"Edit recipe"} onClick={editRecipe}/>
            </div>
        </div>
    )
}
