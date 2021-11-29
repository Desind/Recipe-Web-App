import React from 'react';
import styles from "./register.module.scss"
import TextInput from "../../components/textInput";
import FormButton from "../../components/FormButton";


export default function Register(){

    let [login, setLogin] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");


    return(
        <div className={styles.wrapper}>
            <h1>Register</h1>
            <TextInput label={"E-mail"} type={"email"} valueChange={setEmail}/>
            <TextInput label={"Login"} type={"text"} valueChange={setLogin}/>
            <TextInput label={"Password"} type={"password"} valueChange={setPassword}/>
            <FormButton text={"Register"} onClick={() => {}}/>
        </div>
    )
}
