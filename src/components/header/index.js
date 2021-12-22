import React from 'react';
import styles from './header.module.scss';
import HeaderNavigationButton from "../headerNavigationButton";
import HeaderIconButton from "../headerIconButton";
import {useGlobalState} from "../../state";

export default function Header(){
    const token = useGlobalState('token')[0];
    const role = useGlobalState('userRole')[0];
    const email = useGlobalState('email')[0];


    return(
        <div className={styles.header}>
            <div className={styles.headerWrapper}>
                <div className={styles.menuWrapper}>
                    <HeaderNavigationButton link={"/"} label={"Browse"}/>
                    <HeaderNavigationButton link={"/new"} label={"Add new"}/>
                    {role === "ADMIN" && <HeaderNavigationButton link={"/admin"} label={"Admin panel"}/>}
                </div>
                <HeaderIconButton/>
            </div>
        </div>

    )
}
