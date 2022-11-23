import React from 'react';
import {Paper, Typography} from "@mui/material";

/*const style = createStyles({
    content: {
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center'
    },
    image: {
      padding: 2
    }
})*/

export default function NotImplemented() {

 return(
     <Paper sx={{height: '100vh', backgroundColor: '#1194C1', alignItems: 'center'}}>
         <img src="HTTP-501.png" alt="" width="1080" height="608"/>
         <Typography sx={{color: 'white'}} variant="h4">Μας συγχωρείτε, αλλά δεν έχει αναπτυχθεί ακόμα αυτή η λειτουργία! :(</Typography>

     </Paper>

 )

}