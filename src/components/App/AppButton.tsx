import {Delete, Edit, Visibility} from "@mui/icons-material";
import {Button} from "@mui/material";
import * as React from "react";
import {ReactNode} from "react";

enum IconType {
    View = "view",
    Update = "update",
    Delete = "delete"
}

interface AppButtonProps {
    type: keyof typeof IconType
    onClick: VoidFunction
}

const AppButton = (props: AppButtonProps) => {
    let printButton = () => {
        let buttonShowed = (<></>)
        switch (props.type) {
            case 'View':
                buttonShowed = (
                    <Button variant="contained" color={'primary'} sx={{mx: '.5rem'}} onClick={props.onClick}>
                        <Visibility/>
                    </Button>
                )
                break
            case 'Update':
                buttonShowed = (
                    <Button variant="contained" color={'success'} sx={{mx: '.5rem'}} onClick={props.onClick}>
                        <Edit/>
                    </Button>
                )
                break
            case 'Delete':
                buttonShowed = (
                    <Button variant="contained" color={'error'} sx={{mx: '.5rem'}} onClick={props.onClick}>
                        <Delete/>
                    </Button>
                )
                break
            default:
                buttonShowed = (
                    <Button variant="contained" color={'primary'} sx={{mx: '.5rem'}} onClick={props.onClick}>
                        Button
                    </Button>
                )
                break
        }
        return buttonShowed
    }
    return (
        printButton()
    )
}

export default AppButton