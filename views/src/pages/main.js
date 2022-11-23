import {useEffect} from "react";
import { styled} from '@mui/material/styles';
import {Box} from '@mui/material';

import {useStore} from "../App";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 3,
        // padding: theme.spacing(2),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);

export default function Index() {
    // const [option, setOption] = React.useState("default");

    let component = useStore((state) => state.component);
    let option = useStore((state) => state.option);
    const setComponent = useStore((state) => state.setComponent);
    const setOption = useStore((state) => state.setOption);

    useEffect(() => {
        // console.log(option)
        localStorage.setItem('component-name', option);
    }, [option]);

    return (
        <Box>
            <Main sx={{ height:'100vh', width: '100%'}}>
                {component}
            </Main>
    </Box>
    );
}
