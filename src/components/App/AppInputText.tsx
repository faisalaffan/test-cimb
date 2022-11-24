import {Button, TextField} from "@mui/material";
import * as React from "react";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsColorOverrides} from "@mui/material/TextField/TextField";
import {FormEventHandler} from "react";

enum InputType {
    Text,
}

interface AppInputTextProps {
    value: string
    label: string
    color?: OverridableStringUnion<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        TextFieldPropsColorOverrides>
    type: keyof typeof InputType
    onChange: Function
}

/**
 * This For Validation Input Error
 * @param type
 * @param val
 */
const validationInput = (type: keyof typeof InputType, val: any): boolean => {
    let logic
    switch (type) {
        case 'Text':
            logic = val === ''
            break
        default:
            logic = true
            break
    }
    return logic
}

const validationInputText = (type: keyof typeof InputType, val: string): Array<any> => {
    let logicText: Array<string> = []
    switch (type) {
        case 'Text':
            if (val === '') {
                logicText.push('Tidak Boleh Kosong')
            }
            break
        default:
            logicText = []
            break
    }
    return logicText
}

const AppInputText = (props: AppInputTextProps) => {
    const [isError, setIsError] = React.useState(false);
    const [isErrorText, setIsErrorText] = React.useState(Array<string>);
    const printInput = () => {
        let inputShowed
        switch (props.type) {
            case 'Text':
                inputShowed = (
                    <>
                        <TextField
                            fullWidth={true}
                            error={isError}
                            label={props.label}
                            defaultValue={props.value}
                            sx={{my: '.5rem'}}
                            color={props.color !== undefined ? props.color : 'primary'}
                            onChange={(v) => {
                                props.onChange(v as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)
                                setIsError(validationInput(props.type, v.target.value))
                                setIsErrorText(validationInputText(props.type, v.target.value))
                            }}
                            onBlur={(v) => {
                                props.onChange(v as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)
                                setIsError(validationInput(props.type, v.target.value))
                                setIsErrorText(validationInputText(props.type, v.target.value))
                            }}
                            helperText={isErrorText.length > 0 ? isErrorText[0] : ''}
                        />
                    </>

                )
                break
            default:
                inputShowed = (
                    <>
                        <TextField
                            fullWidth={true}
                            error={isError}
                            label={props.label}
                            defaultValue={props.value}
                            sx={{my: '.5rem'}}
                            color={props.color !== undefined ? props.color : 'primary'}
                            onChange={(v) => {
                                props.onChange(v as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)
                                setIsError(validationInput(props.type, v.target.value))
                            }}
                            helperText={isErrorText.length > 0 ? isErrorText[0] : ''}
                        />
                    </>
                )
                break
        }
        return inputShowed
    }
    return (
        printInput()
    )
}
export default AppInputText