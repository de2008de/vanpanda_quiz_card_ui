import React from "react";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const WCDialog = props => {
    const onBackDropClickHandler = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.open}
                aria-labelledby="confirmation-dialog-title"
                onBackdropClick={onBackDropClickHandler}
                onClick={onBackDropClickHandler}
            >
                <DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
                <DialogContent dividers>
                    {props.content}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.cancelHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={props.confirmHandler} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default WCDialog;
