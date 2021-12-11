import React from 'react';
import styles from "./register.module.scss"
import TextInput from "../../components/textInput";
import FormButton from "../../components/FormButton";
import { endpoints } from "../../api/endpoints";
import {toast} from "react-toastify";
import { useHistory } from "react-router-dom";

export default function Register(){

    let [login, setLogin] = React.useState("");
    let [loginIcon, setLoginIcon] = React.useState("none");
    let [email, setEmail] = React.useState("");
    let [emailIcon, setEmailIcon] = React.useState("none");
    let [password, setPassword] = React.useState("");
    let [passwordIcon, setPasswordIcon] = React.useState("none");

    let history = useHistory();

    function register(login, email, password){

        if(!validate()){
            return null;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": login,
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch(endpoints.register, requestOptions)
            .then(response => {
                if(response.status === 201) {
                    toast.success("Account created successfully! You can log in now.", {
                        position: "bottom-left",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history.push("/login");
                }else{
                    toast.error("text", {
                        position: "bottom-left",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }

    function makeToast(text){
        toast.error(text, {
            position: "bottom-left",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function validate(){
        toast.dismiss();
        let approve = true;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(login.length>2){
            setLoginIcon("approve");
        }else{
            setLoginIcon("deny");
            makeToast("Login must contain at least 3 characters.")
            approve = false;
        }

        if(re.test(email)){
            setEmailIcon("approve");
        }else{
            setEmailIcon("deny");
            makeToast("Please enter a valid e-mail address.")
            approve = false;
        }

        if(password.length>7){
            setPasswordIcon("approve");
        }else{
            setPasswordIcon("deny");
            makeToast("Password must contain at least 8 characters.")
            approve = false;
        }
        return approve;
    }


    return(
        <div className={styles.wrapper}>
            <h1>Register</h1>
            <TextInput label={"Login"} type={"text"} valueChange={setLogin} icon={loginIcon}/>
            <TextInput label={"E-mail"} type={"email"} valueChange={setEmail} icon={emailIcon}/>
            <TextInput label={"Password"} type={"password"} valueChange={setPassword} icon={passwordIcon}/>
            <FormButton text={"Register"} onClick={() => {register(login, email, password)}}/>
        </div>
    )
}
