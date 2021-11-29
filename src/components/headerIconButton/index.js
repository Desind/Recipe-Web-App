import React from 'react';
import styles from './headerIconButton.module.scss';
import chef from "../../assets/chef.png"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";


export default function HeaderIconButton(){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    let history = useHistory();

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.iconButton}>
            <div
                onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                }}
            >
                <img src={chef} alt={""}/>
            </div>
            <Menu
                className={styles.menu}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <div>
                    <div className={styles.status}>Logged in as: </div>
                    <div className={styles.userInfo}>Desind</div>
                    <div className={styles.userInfo}>zaran1998@gmail.com</div>
                </div>
                <Divider className={styles.divider}/>
                <MenuItem onClick={() => {
                    handleClose();
                    history.push('/login');
                }}>
                    Login
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose();
                    history.push("/register")
                }}>
                    Register
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => {
                    handleClose()
                }}>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                }}>
                    Settings
                </MenuItem>
                <Divider className={styles.divider}/>
                <MenuItem onClick={() => {
                    handleClose()
                }}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
