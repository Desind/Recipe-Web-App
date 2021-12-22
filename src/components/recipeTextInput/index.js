import React from 'react';
import styles from './recipeTextInput.module.scss';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function RecipeTextInput(props){


    return(
        <div className={styles.inputWrapper}>
            {props.type === "line" &&
                (props.array === false ?
                    (
                        <input className={styles.lineInput} value={props.value} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                    ):(
                        <input className={styles.lineInput} value={props.value} onChange={(e) => props.valueChange(e.target.value, props.index)} spellCheck="false"/>
                    )
                )
            }
            {props.type === "multiline" &&
                (props.array === false ?
                        (
                            <TextareaAutosize className={styles.multilineInput} value={props.value} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                        ):(
                            <TextareaAutosize className={styles.multilineInput} value={props.value} onChange={(e) => props.valueChange(e.target.value, props.index)} spellCheck="false"/>
                        )
                )
            }
            {props.type === "removableLine" &&

                <div className={styles.removableWrapper}>
                    {
                        (props.array === false ?
                                (
                                    <input className={styles.lineInput} value={props.value} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                                ):(
                                    <input className={styles.lineInput} value={props.value} onChange={(e) => props.valueChange(e.target.value, props.index)} spellCheck="false"/>
                                )
                        )
                    }
                    <CloseIcon fontSize={"large"}  className={styles.closeIcon} onClick={props.onRemoveLine}/>
                </div>
            }
            {props.type === "removableMultiline" &&
                <div className={styles.removableWrapper}>
                    {
                        (props.array === false ?
                                (
                                    <TextareaAutosize className={styles.multilineInput} value={props.value} onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                                ):(
                                    <TextareaAutosize className={styles.multilineInput} value={props.value} onChange={(e) => props.valueChange(e.target.value, props.index)} spellCheck="false"/>
                                )
                        )
                    }
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
