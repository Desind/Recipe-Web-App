import React from 'react';
import styles from './headerIconButton.module.scss';
import chef from "../../assets/chef.png"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import { useGlobalState } from "../../state"


export default function HeaderIconButton(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let history = useHistory();

    const username = useGlobalState('username')[0];
    const userRole = useGlobalState('userRole')[0];
    const email = useGlobalState('email')[0];

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className={styles.iconButton}>
            <div
                onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                }}
                style={{width: "100%", height: "100%", display: "flex", alignItems:"center", justifyContent:"center"}}
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
                    {username !== '' ?
                        <>
                            <div className={styles.status}>Logged in as: </div>
                            <div className={styles.userInfo}>{username}</div>
                            <div className={styles.userInfo}>{email}</div>
                            {userRole.includes("ADMIN") && <div className={styles.userInfo}>(Administrator account)</div>}
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
                        </>
                        :
                        <>
                            <div className={styles.status}>Not logged in </div>
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
                        </>
                    }
                </div>
            </Menu>
        </div>
    );
}
