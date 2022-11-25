import {ReactNode} from "react";
import {Box} from "@mui/material";

interface AppFormProps {
    children: ReactNode
}

const AppForm = (props: AppFormProps) => {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            {props.children}
        </Box>
    )
}
export default AppForm