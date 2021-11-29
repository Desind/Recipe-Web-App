import React from 'react';
import styles from './header.module.scss';
import HeaderNavigationButton from "../headerNavigationButton";
import {BrowserRouter} from "react-router-dom";
import HeaderIconButton from "../headerIconButton";

export default function Header(){
    return(
        <div className={styles.header}>
            <div className={styles.menuWrapper}>
                <BrowserRouter>
                    <HeaderNavigationButton link={"/"} label={"Recommended"}/>
                    <HeaderNavigationButton link={"/browse"} label={"Browse"}/>
                    <HeaderNavigationButton link={"/new"} label={"Add new"}/>
                    <HeaderNavigationButton link={"/admin"} label={"Admin panel"}/>
                </BrowserRouter>
            </div>
            <HeaderIconButton/>
        </div>
    )
}
