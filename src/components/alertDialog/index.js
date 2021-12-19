import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

    return (
        <div>
            <Dialog
                open={props.open}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{
                        color: "#232323"
                    }} onClick={props.onClose}>Cancel</Button>
                    <Button style={{
                        color: "#D58E0F"
                    }} onClick={props.onAction}>{props.actionName}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
