import React from 'react';
import styles from "./login.module.scss"
import TextInput from "../../components/textInput";
import FormButton from "../../components/FormButton";
import { setGlobalState } from "../../state";
import {toast} from "react-toastify";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { endpoints } from "../../api/endpoints";

export default function Login(){

    let [login, setLogin] = React.useState("zaran1998@gmail.com");
    let [password, setPassword] = React.useState("testpass");

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

        fetch(endpoints.login, requestOptions)
            .then(response => {
                if(response.status === 403){
                    makeToast("Invalid login or password.")
                }else{
                    return response.json();
                }
            })
            .then(result => {
                try {
                    var decoded = jwt_decode(result.access_token);
                    setGlobalState('token', result.access_token);
                    setGlobalState('refreshToken', result.refresh_token);
                    setGlobalState('username', decoded.username);
                    setGlobalState('userRole', decoded.roles[0]);
                    setGlobalState('email', decoded.sub);
                    history.push('');
                    toast.success("Successfully logged in as " + decoded.username, {
                        position: "bottom-right",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }catch{}
            })
    }

    return(
        <div className={styles.wrapper}>
            <h1>Log in</h1>
            <TextInput label={"E-mail"} type={"email"} valueChange={setLogin}/>
            <TextInput label={"Password"} type={"password"} valueChange={setPassword}/>
            <FormButton text={"Log in"} onClick={() => {auth(login, password)}}/>
        </div>
    )
}
