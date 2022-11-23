import React, {useEffect} from "react";
import {Paper, Typography} from "@mui/material";
import {useStore} from "../App";
import axios from "axios";

export default function WalletComponent (){
    /*constructor() {
        super();
        this.state = {balance: '0.0'};
    }

    getBalance(){
        axios
            .get('http://localhost:3000/user/wallet')
            .then((response) => {
                this.setState({balance: response.data.balance});
          })
    }

    componentDidMount() {
        this.getBalance();
        console.log(this.state.balance)
    }*/

    let balance = useStore((state) => state.balance);
    const setBalance = useStore((state) => state.setBalance);

    useEffect(() => {
         axios
            .get('http://localhost:3000/user/wallet')
            .then((response) => {
                // this.setState({balance: response.data.balance});
                setBalance(response.data.balance)
            })
    }, [setBalance])

    return(
        <Paper sx={{height: '100%'}}>
            <Typography sx={{position: 'fixed', top: '20%', left: '35%'}} variant={"h2"}>
                Υπόλοιπο λογαριασμού
            </Typography>
            <Typography sx={{position: 'absolute', top: '50%', left: '40%'}} variant={"h3"}>
                Υπόλοιπο: {balance}€
            </Typography>
        </Paper>
    );

}