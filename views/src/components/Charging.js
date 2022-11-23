import React from "react";
import {useState, useEffect} from "react";
import {useStore} from "../App";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import {
    Typography,
    Container,
    Chip,
    Box,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    ButtonBase, Toolbar, AppBar
} from "@mui/material";
import {CreditCard} from "@mui/icons-material";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import ParkingComponent from "./Parking";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const images = [
    {
        img: "images/greece_0001.jpg",
        text: "Ποσό φόρτισης ",
        price: 1.00,
        key: "0"
    },
    {
        img: "images/greece_0008.5.jpg",
        text: "€2.00\nΠοσό φόρτισης",
        price: 2.00,
        key: "1"
    },
    {
        img: "images/greece_0008.6.jpg",
        text: "€4.00\nΠοσό φόρτισης",
        price: 4.00,
        key: "2"
    },
    {
        img: "images/greece_0008.jpg",
        text: "€6.00\nΠοσό φόρτισης",

        price: 6.00,
        key: "3"
    },
    {
        img: "images/greece_0011.jpg",
        price: 10.00,
        key: "4"
    },
    {
        img: "images/greece_0012.jpg",
        price: 20.00,
        key: "5"
    }
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const stripe = loadStripe(
    `${process.env.REACT_APP_STRIPE_KEY}`
);

export default function ChargingComponent(){

    const [amount, setAmount] = useState(1);
    const [secret, setSecret] = useState('');
    const [dialog, setDialog] = useState(false);

    const setComponent = useStore((state) => state.setComponent);
    // const setDialog = useStore((state) => state.setDialog());

    const getClientSecret = () => {
         axios
            .post('http://localhost:3000/charge/init', {
                charge: amount*100
            })
            .then((response) => {
               let secret = response.data.clientSecret
                setSecret(secret)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    // const component =

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

    return(
        <Container>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', marginTop: '10%', marginLeft:'5%' }}>
                {images.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.key}
                        style={{
                            width: '30%',
                        }}
                        onClick={() => {
                            setAmount(image.price)
                        }}
                    >
                        <ImageSrc style={{ backgroundImage: `url(${image.img})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                Ποσό φόρτισης {image.price}.00 €
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                ))}
            </Box>

            <Container sx={{paddingTop: '15%', display: 'block', alignContent: 'space-evenly'}}>

                <Typography variant="body1" >Ανεπαρκές υπόλοιπο. Προσθήκη τρόπου πληρωμής:</Typography>

                <Box >
                    <Chip size={"large"} sx={{marginTop: '5%'}}
                        color="success"
                        label={
                            "ΦΟΡΤΙΣΗ " + amount + '€'
                        }
                        onClick={() => {
                            getClientSecret()
                            setDialog(true)
                        }}
                    />
                </Box>


            </Container>

            {/*<DialogComponent content={component}/>*/}

            {stripe && secret && (
                <Dialog
                fullScreen
                open={dialog}
                onClose={() => {
                    setDialog(false)
                }}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setDialog(false)
                            }}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Προσθήκη τρόπου πληρωμής
                        </Typography>
                        <CreditCard sx={{fontSize: 30}} />

                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Elements stripe={stripe} options={{clientSecret: secret, appearance: {theme: 'flat'}}}>
                        <CheckoutForm amount={amount}/>
                    </Elements>

                </DialogContent>
            </Dialog>
            )}
            {/*{payment}*/}

            {/*{stripe && secret && ()}*/}

            <Box sx={{m: 2, paddingTop: '10%', display: 'flex', justifyContent: 'space-around'}}>
                <ThemeProvider theme={theme}>

                    <Chip clickable label="Πίσω" color="primary" onClick={() => {
                        localStorage.setItem('component-name', "ParkingComponent");
                        setComponent(<ParkingComponent/>)
                    }}></Chip>
                    <Chip sx={{color: 'white'}} clickable variant="contained" color="success" label="Επόμενο" onClick={()=>{
                        localStorage.setItem('component-name', "ChargingComponent");
                        setComponent(<ChargingComponent/>)
                    }}></Chip>
                </ThemeProvider>
            </Box>

        </Container>
    );

}