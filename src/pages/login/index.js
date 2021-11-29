import React from 'react';
import styles from "./login.module.scss"
import TextInput from "../../components/textInput";
import FormButton from "../../components/FormButton";


export default function Login(){

    let [login, setLogin] = React.useState("");
    let [password, setPassword] = React.useState("");


    return(
        <div className={styles.wrapper}>
            <h1>Log in</h1>
            <TextInput label={"Login"} type={"text"} valueChange={setLogin}/>
            <TextInput label={"Password"} type={"password"} valueChange={setPassword}/>
            <FormButton text={"Log in"} onClick={() => {}}/>
        </div>
    )
}
