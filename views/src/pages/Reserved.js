import {useStore} from "../App";
import {Box, Chip, Container, Typography} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ChargingComponent from "../components/Charging";
import PostPayment from "./post-payment";

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

export default function ReservedComponent(){

    const ticket = useStore((state) => state.ticketType);
    const price = useStore((state) => state.price);
    const setComponent = useStore((state) => state.setComponent);

    return(
        <Container>

            <Typography variant="h5">
                Θέση παρκαρίσματος για {ticket} λεπτά:
            </Typography>

            <Typography variant="body1">
                Σύνολο: {price}
            </Typography>

             <Box sx={{m: 2, display: 'flex', justifyContent: 'space-between'}}>
                  <ThemeProvider theme={theme}>

                      <Chip clickable label="Πίσω" color="primary" onClick={() => {
                          localStorage.setItem('component-name', "MapComponent");
                          setComponent(<ChargingComponent/>)
                      }}></Chip>
                      <Chip sx={{color: 'white'}} clickable variant="contained" color="success" label="Επόμενο" onClick={()=>{
                          localStorage.setItem('component-name', "ChargingComponent");
                          setComponent(<PostPayment/>)
                      }}></Chip>
                  </ThemeProvider>
              </Box>
        </Container>
    );
}