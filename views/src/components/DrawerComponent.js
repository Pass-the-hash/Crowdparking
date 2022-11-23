import {useNavigate} from "react-router-dom";
import {useStore} from "../App";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {CalendarMonth, History, Logout, MessageSharp, Person, ReadMore, Wallet} from "@mui/icons-material";
import Link from "@mui/material/Link/Link";
// import React from "@types/react";
import {styled, useTheme} from "@mui/material/styles";


const drawerWidth = 240;

export default function DrawerComponent(){
    let open = useStore((state) => state.open)
    const setOpen = useStore((state) => state.setOpen);

    const navigate = useNavigate();

    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
        // margin: '5px 0'
    }));

    return(
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            // variant="persistent"
            anchor="right"
            open={open}
            onClose={handleDrawerClose}
        >
            {/*<DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>*/}
            <Divider />
            <List>
                {/*{[, 'Πορτοφόλι', 'Ιστορικό', 'Μηνύματα'].map((text, index) => (*/}
                <ListItem onClick={() => {
                    /*setOption("MapComponent");
                    setComponent(<MapComponent/>)*/
                    navigate('/')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon></InboxIcon>
                        </ListItemIcon>
                        <ListItemText primary='Ενεργοποίηση εισιτηρίου' />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    onClick={() => {
                        navigate('/wallet')
                        /*setOption("WalletComponent");
                        setComponent(<WalletComponent/>)*/

                    }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Wallet></Wallet>
                        </ListItemIcon>
                        <ListItemText sx={{textDecoration: 'none'}} primary='Πορτοφόλι'/>
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={() => {
                    navigate('/history')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <History></History>
                        </ListItemIcon>
                        <ListItemText primary='Ιστορικό'/>
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={() => {
                    navigate('/news')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MessageSharp></MessageSharp>
                        </ListItemIcon>
                        <ListItemText primary='Μηνύματα'/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem onClick={() => {
                    navigate('/calendar')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CalendarMonth></CalendarMonth>
                        </ListItemIcon>
                        <ListItemText primary='Ημερολόγιο' />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <ReadMore></ReadMore>
                        </ListItemIcon>
                        <ListItemText primary='Όροι χρήσης'/>
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={() => {
                    navigate('/profile')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Person></Person>
                        </ListItemIcon>
                        <ListItemText primary='Προφίλ'/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Box sx={{width: 300, height: 500}}/>
            <List>
                <ListItem component={Link} href="/login" >
                    <ListItemButton>
                        <ListItemIcon>
                            <Logout></Logout>
                        </ListItemIcon>
                        <ListItemText primary="Αποσύνδεση" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
