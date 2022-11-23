import {useState} from "react";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";
import {useStore} from "../App";

export default function DialogComponent(props){
    let open = useStore((state) => (state.dialog));
    const setOpen = useStore((state) => (state.setDialog()))
    /*const Open = () => {
        setOpen(true);
    };*/

    const Close = () =>{
        setOpen(false);
    }

    const ThemedDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const ThemedDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }

    ThemedDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    return(
        <ThemedDialog
            fullWidth
            onClose={() => {
                this.Close()
            }}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <ThemedDialogTitle id="customized-dialog-title" onClose={() => {
                this.Close()
            }}>
                Επιλογή θέσης
            </ThemedDialogTitle>
             <DialogContent dividers>

                 {props.content}

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => {
                    // this.sendData()
                    // this.Close()
                }}>
                    φορτιση
                </Button>
            </DialogActions>
        </ThemedDialog>
    );
}