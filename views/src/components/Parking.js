import React, {useEffect, useState} from "react";
import {useStore} from "../App";
import axios from "axios";
import {
    Card,
    TextField,
    List,
    ListItemText,
    ListItem,
    Divider,
    Container,
    Slider,
    styled,
    Chip,
    Box, Typography, Button, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog
} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ChargingComponent from "./Charging";
import MapComponent from "./Map";

const marks = [
    /*{
      value: 0,
      label: "0'"
    },*/
    {
      value: 30,
      label: "30'"
    },
    {
      value: 60,
      label: "60'"
    },
    {
      value: 90,
      label: "90'"
    },
    {
      value: 120,
      label: "120'"
    },
    {
      value: 150,
      label: "150'"
    },
    {
      value: 180,
      label: "180'"
    }
  ]

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 2,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const theme = createTheme({
    spacing: 4,
    palette: {
      success: {
          main: '#52af77'
      },
        primary: {
            main: '#64748B'
        }
    },

});



export default function ParkingComponent(){

    let price = useStore((state) => state.price);
    let balance = useStore((state) => state.balance);
    let dialog = useStore((state) => state.dialog);
    let ticket = useStore((state) => state.ticketType);

    const setPrice = useStore((state) => state.setPrice);
    const setComponent = useStore((state) => state.setComponent);
    const setTicket = useStore((state) => state.setTicket);
    const setTicketType = useStore((state) => state.setTicketType);
    const setBalance = useStore((state) => state.setBalance);
    const setDialog = useStore((state) => state.setDialog);

    useEffect(() => {
         axios
            .get('http://localhost:3000/user/wallet')
            .then((response) => {
                // this.setState({balance: response.data.balance});
                setBalance(response.data.balance)
            })
    }, [setBalance])

    const BuyTicket = () => {
        setTicket(true)
        console.log(price)
        axios
            .patch('http://localhost:3000/user/ticket/new', {
                ticket: {
                    email: "maurom1999@gmail.com",
                    minutes: ticket,
                    price: price,
                    date: Date.now()
                }
            })
            .then((response) => {
                if (response.data.message === "Ανεπαρκές υπόλοιπο") {
                    localStorage.setItem('component-name', "ChargingComponent")
                    setComponent(<ChargingComponent/>)
                } else setBalance(response.data.balance)
            })

    }

    return(
        <Container>
            <Typography sx={{paddingTop: '10%'}} variant="subtitle1">
                ΕΠΙΛΟΓΕΣ ΣΤΑΘΜΕΥΣΗΣ
            </Typography>
            <Card sx={{marginTop: '5%', paddingTop: '5%'}}>
              <Box sx={{ m: 3 }}>
                  <PrettoSlider
                      valueLabelDisplay="auto"
                      aria-label="pretto slider"
                      defaultValue={0}
                      step={null}
                      marks={marks}
                      min={30}
                      max={180}
                      onChange={(e, value) => {
                          if (value === 150) {
                              setPrice((value / 30) - 1 )
                              setTicketType("150'")
                          } else if (value === 180) {
                              setPrice(value / 30 )
                              setTicketType("180'")
                          } else {
                              setPrice(value / 30 * 0.5 )
                              setTicketType(`${value}'`)
                          }
                      }}
                      /*onDragStop={(e) => this.state.update((e, control.id, price){
                          setPrice(price)
                      })}*/
                  ></PrettoSlider>
              </Box>

            <List component="nav" aria-label="mailbox folders">
              <ListItem >
                <ListItemText primary="Κόστος στάθμευσης" secondary={`${price}€`}/>
              </ListItem>
              <Divider/>
              <ListItem divider>
                <ListItemText primary="Υπόλοιπο" secondary={`${balance}€`} />
              </ListItem>
              <ListItem >
                <TextField id="filled-basic" label="Αριθμός πινακίδας" defaultValue="ΚΥΜΝΞΓΜΔΒ" variant="filled" />
              </ListItem>
            </List>

                <Dialog
                    open={dialog}
                    onClose={() => {
                        setDialog(false)
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Αγορά εισιτηρίου"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Typography variant="body1"> Διάρκεια: {ticket} </Typography>
                        <Typography variant="body1">Κόστος: {price}€</Typography>
                        <Typography variant="h5">Υπόλοιπο: {balance}€</Typography>

                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      {/*<Button onClick={handleClose}>Disagree</Button>*/}
                      <Button color="success" onClick={()=>{
                          BuyTicket()
                          localStorage.setItem('component-name', "MapComponent")
                          setComponent(<MapComponent/>)
                      }} autoFocus>
                        Αγορα
                      </Button>
                    </DialogActions>
                </Dialog>
              <Box sx={{m: 2, display: 'flex', justifyContent: 'space-between'}}>
                  <ThemeProvider theme={theme}>

                      <Chip clickable label="Πίσω" color="primary" onClick={() => {
                          localStorage.setItem('component-name', "MapComponent")
                          setComponent(<MapComponent/>)
                      }}></Chip>
                      <Chip sx={{color: 'white'}} clickable variant="contained" color="success" label="Επόμενο" onClick={()=>{
                          localStorage.setItem('component-name', "ChargingComponent");
                          balance > 0 && price <= balance ? setDialog(true) : setComponent(<ChargingComponent/>)
                      }}></Chip>
                  </ThemeProvider>
              </Box>
          </Card>
        </Container>

    )
}