import React from 'react';
import styles from './header.module.scss';
import HeaderNavigationButton from "../headerNavigationButton";
import HeaderIconButton from "../headerIconButton";

export default function Header(){
    return(
        <div className={styles.header}>
            <div className={styles.menuWrapper}>
                <HeaderNavigationButton link={"/"} label={"Browse"}/>
                <HeaderNavigationButton link={"/newest"} label={"Newest"}/>
                <HeaderNavigationButton link={"/recommended"} label={"Recommended"}/>
                <HeaderNavigationButton link={"/new"} label={"Add new"}/>
                <HeaderNavigationButton link={"/admin"} label={"Admin panel"}/>
            </div>
            <HeaderIconButton/>
        </div>
    )
}
