import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";


function AlertWithTextField({ title, description, completedMessage }) {
    const [open, setOpen] = useState(true);
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const didChangeTextField = (event) => {
        setTextFieldValue(event.target.value);
    };

    const didSave = () => {
        setOpen(false);
        alert(completedMessage);
    };

    useEffect(() => {
        setOpen(true)
    }, []);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="textField"
                    label="텍스트 입력"
                    fullWidth
                    value={textFieldValue}
                    onChange={didChangeTextField}
                    />
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={didSave} color="primary">
                        Report
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default AlertWithTextField;