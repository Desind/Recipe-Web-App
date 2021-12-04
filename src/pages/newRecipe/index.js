import React, {useRef} from 'react';
import styles from "./newRecipe.module.scss"
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


export default function NewRecipe(){

    const imageRef = useRef(null);

    function uploadImage(file) {
        return undefined;
    }

    return(
        <div className={styles.wrapper}>
            <h1>New Recipe</h1>
            <div className={styles.label}>Title</div>
            <RecipeTextInput type={"line"} valueChange={() => {}}/>

            <div className={styles.label}>Description</div>
            <RecipeTextInput type={"multiline"} valueChange={() => {}}/>

            <div className={styles.label}>Ingredients</div>
            <RecipeTextInput type={"line"} valueChange={() => {}}/>
            <RecipeTextInput type={"removableLine"} valueChange={() => {}}/>
            <div className={styles.addButtonWrapper}>
                <AddIcon className={styles.addButton} fontSize={"large"}/>
            </div>

            <div className={styles.label}>Recipe steps</div>
            <RecipeTextInput type={"multiline"} valueChange={() => {}}/>
            <RecipeTextInput type={"removableMultiline"} valueChange={() => {}}/>
            <div className={styles.addButtonWrapper}>
                <AddIcon className={styles.addButton} fontSize={"large"}/>
            </div>

            <div className={styles.accordionWrapper}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        className={styles.accordionSummary}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className={styles.accordionLabel}>Allergens <p>(1)</p></div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.allergyWrapper}>
                            <div className={styles.allergySelected}>
                                <img src={Celery} alt={"celery"}/>
                                <p>Celery</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Eggs} alt={""}/>
                                <p>Eggs</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Fish} alt={""}/>
                                <p>Fish</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Gluten} alt={""}/>
                                <p>Gluten</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Lupine} alt={""}/>
                                <p>Lupine</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Milk} alt={""}/>
                                <p>Milk</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Molluscs} alt={""}/>
                                <p>Molluscs</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Mustard} alt={""}/>
                                <p>Mustard</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Nuts} alt={""}/>
                                <p>Nuts</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Peanuts} alt={""}/>
                                <p>Peanuts</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Sesame} alt={""}/>
                                <p>Sesame</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Shellfish} alt={""}/>
                                <p>Shellfish</p>
                            </div>
                            <div className={styles.allergy}>
                                <img src={Sulphite} alt={""}/>
                                <p>Sulphite</p>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className={styles.accordionWrapper}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        className={styles.accordionSummary}
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <div className={styles.accordionLabel}>Categories</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectableSelected}>
                                <p>Celery</p>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div className={styles.accordionWrapper}>
                <Accordion className={styles.accordion}>
                    <AccordionSummary
                        className={styles.accordionSummary}
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <div className={styles.accordionLabel}>Cuisine</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={styles.cuisineWrapper}>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectableSelected}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
                            <div className={styles.selectable}>
                                <p>Celery</p>
                            </div>
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
                    src={noImage}
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
                <p>(15 min)</p>
            </div>
            <div className={styles.sliderWrapper}>
                <input className={styles.slider} type="range" min="15" max="240" step="15"/>
            </div>

            <div className={styles.durationHeader}>
                <div className={styles.label}>Difficulty</div>
                <p>(Easy)</p>
            </div>
            <div className={styles.sliderWrapper}>
                <input className={styles.slider} type="range" min="1" max="5"/>
            </div>

            <div className={styles.buttonWrapper}>
                <FormButton text={"Publish recipe"} onClick={() => {}}/>
            </div>
        </div>
    )
}
