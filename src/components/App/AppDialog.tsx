import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React from "react";

interface AppDialogProps {
    open: boolean
    title?: string
    desc?: string
    submitText?: string
    isShowSubmit?: boolean
    onCancel: VoidFunction
    onSubmit: VoidFunction
    children?: React.ReactNode
}

const AppDialog = (props: AppDialogProps) => {
    const printDesc = () => {
        if (props.desc !== undefined) {
            return (
                <h1>{props.desc}</h1>
            )
        }
    }
    const printSubmit = () => {
        const submitText = props.submitText !== undefined ? props.submitText : 'Submit'
        let showSubmit = <Button onClick={props.onSubmit}>{submitText}</Button>
        if (props.isShowSubmit !== undefined && !props.isShowSubmit) {
            showSubmit = (<></>)
        }
        return showSubmit
    }
    return (
        <Dialog fullWidth={true} maxWidth={'lg'} open={props.open} onClose={props.onCancel}>
            <DialogTitle>
                {props.title === undefined ? 'TITLE' : props.title}
            </DialogTitle>
            <DialogContent>
                {printDesc()}
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                {printSubmit()}
            </DialogActions>
        </Dialog>
    );
}

export default AppDialog