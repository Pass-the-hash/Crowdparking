import {styled} from "@mui/material/styles";
import {useStore} from "../App";
import MuiAppBar from "@mui/material/AppBar";
import {IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


const drawerWidth = 240;

export default function Navbar() {

    let open = useStore((state) => state.open)
    const setOpen = useStore((state) => state.setOpen);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth,
        }),
    }));

    return(
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                    Crowd parking
                </Typography>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    sx={{ ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}