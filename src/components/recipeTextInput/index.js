import React from 'react';
import styles from './recipeTextInput.module.scss';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function RecipeTextInput(props){


    return(
        <div className={styles.inputWrapper}>
            {props.type === "line" &&
                <input className={styles.lineInput} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
            }
            {props.type === "multiline" &&
                <TextareaAutosize className={styles.multilineInput} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
            }
            {props.type === "removableLine" &&
                <div className={styles.removableWrapper}>
                    <input className={styles.removableLine} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                    <CloseIcon fontSize={"large"}  className={styles.closeIcon} onClick={props.onRemoveLine}/>
                </div>
            }
            {props.type === "removableMultiline" &&
                <div className={styles.removableWrapper}>
                    <TextareaAutosize className={styles.multilineInput} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                    <CloseIcon fontSize={"large"}  className={styles.closeIcon} onClick={props.onRemoveLine}/>
                </div>
            }


        </div>
    )
}
RecipeTextInput.propTypes = {
    valueChange: PropTypes.func,
    type: PropTypes.oneOf(['line','multiline','removableLine','removableMultiline']).isRequired,
    icon: PropTypes.oneOf(['approve','deny','none'])
}
