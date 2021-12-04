import React, {useEffect} from 'react';
import styles from './recipeCard.module.scss';
import cleaver from '../../assets/cleaver.svg'

export default function Difficulty(props){

    const difficulty = props.difficulty;
    let [diffNumber, setDiffNumber] = React.useState(3);
    /* eslint-disable */
    useEffect(() => {
        switch(difficulty){
            case 'BEGGINER':
                setDiffNumber(1);
                break;
            case 'EASY':
                setDiffNumber(2);
                break;
            case 'AVERAGE':
                setDiffNumber(3);
                break;
            case 'ADVANCED':
                setDiffNumber(4);
                break;
            case 'HARD':
                setDiffNumber(5);
                break;
        }
    },[])

    return(
        <div className={styles.difficultyWrapper}>
            <img className={styles.difficultyIconActive} src={cleaver} alt={""}/>
            <img className={diffNumber > 1 ? styles.difficultyIconActive : styles.difficultyIcon} src={cleaver} alt={""}/>
            <img className={diffNumber > 2 ? styles.difficultyIconActive : styles.difficultyIcon} src={cleaver} alt={""}/>
            <img className={diffNumber > 3 ? styles.difficultyIconActive : styles.difficultyIcon} src={cleaver} alt={""}/>
            <img className={diffNumber > 4 ? styles.difficultyIconActive : styles.difficultyIcon} src={cleaver} alt={""}/>
        </div>
    )
}
