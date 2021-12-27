import React, {useEffect} from 'react';
import styles from './recipeTextInput.module.scss';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import Modal from "@material-ui/core/Modal";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {endpoints} from "../../api/endpoints";
import {toast} from "react-toastify";

export default function RecipeTextInput(props) {

    const [data, setData] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    function fetchProduct(ean){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(endpoints.getProduct + ean, requestOptions)
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }else {
                    return {"name": null};
                }
            })
            .then(result => {
                console.log(result);
                try {
                    props.valueChange(result.name.toString(),props.index);
                }catch (e) {
                    toast.error('Info about this product is not available.', {
                        position: "bottom-right",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })

    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={styles.modalContainer}>
                    <h2>Scan product</h2>
                    <BarcodeScannerComponent
                        width={640}
                        height={480}
                        onUpdate={(err, result) => {
                            if(result){
                                setData(result.getText());
                                setOpen(false);
                                fetchProduct(result.getText());
                            }
                            else setData(null);
                        }}
                    />
                </div>
            </Modal>
            <div className={props.fullWidth === true ? (styles.inputWrapperWide) : styles.inputWrapper}>
                {props.type === "line" &&
                    (props.array === false ?
                            (
                                <input className={styles.lineInput} value={props.value}
                                       onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                            ) : (
                                <input className={styles.lineInput} value={props.value}
                                       onChange={(e) => props.valueChange(e.target.value, props.index)} spellCheck="false"/>
                            )
                    )
                }
                {props.type === "multiline" &&
                    (props.array === false ?
                            (
                                <TextareaAutosize className={styles.multilineInput} value={props.value}
                                                  onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                            ) : (
                                <TextareaAutosize className={styles.multilineInput} value={props.value}
                                                  onChange={(e) => props.valueChange(e.target.value, props.index)}
                                                  spellCheck="false"/>
                            )
                    )
                }
                {props.type === "removableLine" &&

                <div className={styles.removableWrapper}>
                    {
                        (props.array === false ?
                                (
                                    <input className={styles.lineInput} value={props.value}
                                           onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                                ) : (
                                    <input className={styles.lineInput} value={props.value}
                                           onChange={(e) => props.valueChange(e.target.value, props.index)}
                                           spellCheck="false"/>
                                )
                        )
                    }
                    <CloseIcon fontSize={"large"} className={styles.closeIcon} onClick={props.onRemoveLine}/>
                </div>
                }
                {props.type === "removableMultiline" &&
                <div className={styles.removableWrapper}>
                    {
                        (props.array === false ?
                                (
                                    <TextareaAutosize className={styles.multilineInput} value={props.value}
                                                      onChange={(e) => props.valueChange(e.target.value)}
                                                      spellCheck="false"/>
                                ) : (
                                    <TextareaAutosize className={styles.multilineInput} value={props.value}
                                                      onChange={(e) => props.valueChange(e.target.value, props.index)}
                                                      spellCheck="false"/>
                                )
                        )
                    }
                    <CloseIcon fontSize={"large"} className={styles.closeIcon} onClick={props.onRemoveLine}/>
                </div>
                }
                {props.type === "ingredient" &&
                    (props.array === false ?
                        <div className={styles.ingredientWrapper}>
                            <LinkedCameraIcon fontSize={"large"} className={styles.closeIcon} onClick={() => {
                                setOpen(true);
                            }}/>
                            <input className={styles.lineInput} value={props.value}
                                   onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                        </div>
                            :
                        <div className={styles.ingredientWrapper}>
                            <LinkedCameraIcon fontSize={"large"} className={styles.scanIcon} onClick={() => {
                                setOpen(true);
                            }}/>
                            <input className={styles.lineInput} value={props.value}
                                   onChange={(e) => props.valueChange(e.target.value, props.index)} spellCheck="false"/>
                        </div>
                    )
                }
                {props.type === "removableIngredient" &&
                (props.array === false ?
                        <div className={styles.ingredientWrapper}>
                            <LinkedCameraIcon fontSize={"large"} className={styles.closeIcon} onClick={() => {
                                setOpen(true);
                            }}/>
                            <input className={styles.lineInput} value={props.value}
                                   onChange={(e) => props.valueChange(e.target.value)} spellCheck="false"/>
                            <CloseIcon fontSize={"large"} className={styles.closeIcon} onClick={props.onRemoveLine}/>
                        </div>

                        :
                        <div className={styles.ingredientWrapper}>
                            <LinkedCameraIcon fontSize={"large"} className={styles.scanIcon} onClick={() => {
                                setOpen(true);
                            }}/>
                            <input className={styles.lineInput} value={props.value}
                                   onChange={(e) => props.valueChange(e.target.value, props.index)} spellCheck="false"/>
                            <CloseIcon fontSize={"large"} className={styles.closeIcon} onClick={props.onRemoveLine}/>
                        </div>
                )
                }


            </div>
        </>
    )
}
RecipeTextInput.propTypes = {
    valueChange: PropTypes.func,
    type: PropTypes.oneOf(['line', 'multiline', 'removableLine', 'removableMultiline']).isRequired,
    icon: PropTypes.oneOf(['approve', 'deny', 'none'])
}
