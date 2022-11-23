import React from "react";
import {Container, Chip, Stack, Typography} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TextField from "@mui/material/TextField";


const color = createTheme({
  palette: {
    primary: {
        main: '#56b663',
    },
  },
});

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "maurom1999@gmail.com",
                name: "Ιωάννης",
                surname: "Μαυρομματάκης",
                phone: "6909999999",
                postal_code: "18543",
                address: "Λεύκα"
            }
        };
    }

    /*getProfile(){
        axios
            .get('http://localhost:3000/user/maurom1999@gmail.com')
            .then((response) => {
                this.setState({
                    user: response.data.user
                })
            })
    }*/

    componentDidMount() {
        // document.title = `You clicked ${this.state.count} times`;
        // this.getProfile();
    }

    render(){
        return(
            <Container>
                <Typography sx={{marginTop:'10vh'}} variant={"h6"}>Προφίλ</Typography>
                <Stack spacing={2} sx={{ width: 300, paddingTop: '5%', marginLeft: '30%'}}>
                    <TextField
                        id="filled-helperText"
                        label="email"
                        defaultValue={this.state.user.email}
                        // helperText={this.state.user.email}
                        variant="filled"
                    />
                    <TextField
                        id="filled-helperText"
                        label="Όνομα"
                        defaultValue={this.state.user.name}
                        // helperText={this.state.user.email}
                        variant="filled"
                    />
                    <TextField
                        id="filled-helperText"
                        label="Επίθετο"
                        defaultValue={this.state.user.surname}
                        // helperText={this.state.user.email}
                        variant="filled"
                    />
                    <TextField
                        id="filled-helperText"
                        label="Κινητό"
                        defaultValue={this.state.user.phone}
                        // helperText={this.state.user.email}
                        variant="filled"
                    />
                    <TextField
                        id="filled-helperText"
                        label="Ταχυδρομικός κώδικας"
                        defaultValue={this.state.user.postal_code}
                        // helperText={this.state.user.email}
                        variant="filled"
                    />
                    <TextField
                        id="filled-helperText"
                        label="Διεύθυνση"
                        defaultValue={this.state.user.address}
                        // helperText={this.state.user.email}
                        variant="filled"
                    />
                </Stack>
                <ThemeProvider theme={color}>
                    <Chip sx={{marginTop: '10%', color: 'white'}} color={"primary"} label="Αποθηκευση" onClick={() => {}} ></Chip>
                </ThemeProvider>
            </Container>
        )
    }


}