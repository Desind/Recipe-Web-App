import React, {useEffect} from 'react';
import styles from "./homepage.module.scss"
import RecipeCard from "../../components/recipeCard";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AllergenCheckbox from "../../components/allergenCheckbox";
import {endpoints} from "../../api/endpoints";
import _ from "lodash";
import TextCheckbox from "../../components/textCheckbox";
import Pagination from "@mui/material/Pagination";


export default function Homepage(){

    const [title, setTitle] = React.useState("")

    const [allAllergens, setAllAllergens] = React.useState([]);
    const [disabledAllergens, setDisabledAllergens] = React.useState([]);

    const [allCategories, setAllCategories] = React.useState([]);
    const [selectedCategories, setSelectedCategories] = React.useState([]);

    const [allCuisines, setAllCuisines] = React.useState([]);
    const [selectedCuisines, setSelectedCuisines] = React.useState([]);

    const [fetchedRecipes, setFetchedRecipes] = React.useState([]);

    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState(0);
    const [paginationDisabled, setPaginationDisabled] = React.useState(false);

    const [currentAccordion,setCurrentAccordion] = React.useState(0);

    function fetchAllergens(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(endpoints.getAllergens, requestOptions)
            .then(response => response.json())
            .then(result => {
                setAllAllergens(_.sortBy(result));
            })
        return [];
    }

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
    }

    function fetchRecipes(){
        setPaginationDisabled(true);
        console.log("fetch", page)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(endpoints.getRecipesQuery+"?title="+title+"&allergens="+disabledAllergens.toString()+"&categories="+selectedCategories.toString()+"&cuisines="+selectedCuisines.toString()+"&page="+page+"&pageSize=8", requestOptions)
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }else return [];
            }).then(result => {
                setFetchedRecipes(result.recipes);
                setPageCount(result.pageCount);
                console.log(result.recipes);
                setPage(result.page);
                setPaginationDisabled(false);
            }
        )
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
        fetchAllergens();
        fetchCuisines();
        fetchCategories();
        fetchRecipes();
    },[]);
    useEffect(() => {
        fetchRecipes();
    },[page]);

    return(
        <div className={styles.wrapper}>
            <div className={styles.bar}>
                <h2 className={styles.searchTitle}>Filter recipes</h2>
                <input onChange={(e) => {
                    setTitle(e.target.value);
                }} type={"text"} className={styles.searchInput}/>
                <div>
                    <Accordion expanded={currentAccordion === 1} className={styles.accordion}>
                        <AccordionSummary
                            onClick={() => {currentAccordion !== 1 ? (setCurrentAccordion(1)):setCurrentAccordion(0)}}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <div className={styles.accordionTitle}>Allergens {disabledAllergens.length>0 && <p>({disabledAllergens.length})</p>}</div>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordionContent}>
                            <div className={styles.allergenWrapper}>
                                {allAllergens.map((item, id) => {
                                    return(
                                        <AllergenCheckbox disabled={disabledAllergens.includes(item)} allergen={item} onClick={() => {
                                            if(!disabledAllergens.includes(item)){
                                                setDisabledAllergens([...disabledAllergens,item]);
                                            }else{
                                                setDisabledAllergens([...disabledAllergens].filter(function(allergy) {return allergy !== item}))
                                            }
                                        }}/>
                                    )
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={currentAccordion === 2} className={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            onClick={() => {currentAccordion !== 2 ? (setCurrentAccordion(2)):setCurrentAccordion(0)}}
                        >
                            <div className={styles.accordionTitle}>Cuisines {selectedCuisines.length>0 && <p>({selectedCuisines.length})</p>}</div>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordionContent}>
                            <div className={styles.buttonWrapper}>
                                {allCuisines.map((item, id) => {
                                    return(
                                        <TextCheckbox selected={selectedCuisines.includes(item)} text={item} onClick={() => {
                                            if(!selectedCuisines.includes(item)){
                                                setSelectedCuisines([...selectedCuisines,item]);
                                            }else{
                                                setSelectedCuisines([...selectedCuisines].filter(function(cuisine) {return cuisine !== item}))
                                            }
                                        }}/>
                                    )
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={currentAccordion === 3} className={styles.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            onClick={() => {currentAccordion !== 3 ? (setCurrentAccordion(3)):setCurrentAccordion(0)}}
                        >
                            <div className={styles.accordionTitle}>Categories {selectedCategories.length>0 && <p>({selectedCategories.length})</p>}</div>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordionContent}>
                            <div className={styles.buttonWrapper}>
                                {allCategories.map((item, id) => {
                                    return(
                                        <TextCheckbox selected={selectedCategories.includes(item)} text={item} onClick={() => {
                                            if(!selectedCategories.includes(item)){
                                                setSelectedCategories([...selectedCategories,item]);
                                            }else{
                                                setSelectedCategories([...selectedCategories].filter(function(category) {return category !== item}))
                                            }
                                        }}/>
                                    )
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <button onClick={() => fetchRecipes()} className={styles.searchButton}>
                        <p>Search</p>
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                {fetchedRecipes.map((item,id) =>{
                    return(
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
                            creationDate={parseISOTime(item.creationDate)}
                        />
                    )
                })}
                {pageCount>1 && <Pagination onChange={(e,v) => {
                    setPage(v);
                }}  disabled={paginationDisabled} style={{marginTop: "30px", marginBottom:"-40px"}} size="large" shape="rounded" count={pageCount} />}
            </div>
        </div>
    )
}
