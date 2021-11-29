import React from 'react';
import styles from "./login.module.scss"
import TextInput from "../../components/textInput";
import FormButton from "../../components/FormButton";
import { setGlobalState } from "../../state";
import {toast} from "react-toastify";
import { useHistory } from "react-router-dom";


export default function Login(){

    let [login, setLogin] = React.useState("");
    let [password, setPassword] = React.useState("");

    let history = useHistory();

    function makeToast(text){
        toast.error(text, {
            position: "bottom-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function auth(login, password){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("login", login);
        urlencoded.append("password", password);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        };

        fetch("http://localhost:8080/login", requestOptions)
            .then(response => {
                if(response.status === 403){
                    makeToast("Invalid login or password.")
                }else{
                    return response.json();
                }
            })
            .then(result => {
                try {
                    setGlobalState('token', result.access_token);
                    setGlobalState('refreshToken', result.refresh_token);
                    history.push('');
                }catch{}
            })
    }

    return(
        <div className={styles.wrapper}>
            <h1>Log in</h1>
            <TextInput label={"Login"} type={"text"} valueChange={setLogin}/>
            <TextInput label={"Password"} type={"password"} valueChange={setPassword}/>
            <FormButton text={"Log in"} onClick={() => {auth(login, password)}}/>
        </div>
    )
}
