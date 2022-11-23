import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Box, Chip, Container, Typography} from "@mui/material";
import {useStore} from "../App";
import axios from "axios";

export default function PostPayment(props){

    const [message, setMessage] = useState('');

    const success = useStore((state) => state.success);
    const setSuccess = useStore((state) => state.setSuccess);
    const setError = useStore((state) => state.setError);

    const navigate = useNavigate();

    const {amount} = useParams();

    useEffect(()=>{
        console.log(amount)
        axios
            .patch('http://localhost:3000/charge/success', {
                charge: amount
            })
            .then(() => {
                setSuccess(true)
                setError(false)
            })
            .catch((error)=>{
                setSuccess(false)
                setError(true)
                setMessage(error.response.data)
            })
    }, [amount, setError, setSuccess])

    return(
        <Container sx={{marginTop: '15%'}}>
            {success ?
                <Box>
                    <img src="nutmeg.gif" alt="" />
                    <Alert severity="success">Επιτυχής πληρωμή!</Alert>
                </Box>
                :
                <Box>
                    <Typography variant="h4">
                        ΣΦΑΛΜΑ!
                    </Typography>
                    <Alert sx={{marginTop: '5%'}} severity="error"> {message}</Alert>

                </Box>
            }

            <Chip sx={{marginTop: '10%', color: 'white'}} clickable variant="contained" color="success" label="Επιστροφή" onClick={() =>{
                navigate('/')
            }}></Chip>
        </Container>

    );
}