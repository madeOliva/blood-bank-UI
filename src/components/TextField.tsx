import { TextField } from "@mui/material";

export default function TextFieldP() {
    return (
        <>
            <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                sx={{
                    width: 150,
                    // Cambia el color del texto
                    "& .MuiOutlinedInput-root": {
                        color: "#000",
                        // Cambia el color del borde
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00796B",
                        },
                        // Cambia el color del borde al hacer foco
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00796B",
                        },
                    },
                    // Cambia el color del label
                    "& .MuiInputLabel-outlined": {
                        color: "#009688",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        paddingLeft: "8px",
                        paddingRight: "8px",
                    },
                }}
            />

        </>
    )
}