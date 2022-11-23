import React from "react";
import {Card, Container, CardContent, CardHeader, Chip, Stack} from "@mui/material";

function createDates(){
    const day = 1000 * 60 * 60 * 24;
    const date = new Date();
    const dates = [];
    for (let i=1; i<=7; i++){
        dates.push(new Date(date.getTime() + i * day))
    }
    return dates;
}

function renderChip(date){
    let chip;
    if (date.getDay() === 0) chip = <Chip color={"error"} label={"Χωρίς χρέωση"}></Chip>
    else chip = <Chip color={"success"} label={"09:00-21:00"}></Chip>
    return chip;
}

export default function Calendar(){

    return(
        <Container sx={{marginLeft: "20%", marginTop: "10%", position: "absolute"}} height={"30vh"}>
            <Stack spacing={2} height={"60%"}>
                {createDates().map((date) => (
                    <Card key={date}>
                        <CardHeader title={date.toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}/>
                        <CardContent>
                            {renderChip(date)}

                        </CardContent>
                    </Card>
                ))}

            </Stack>
        </Container>

    );


}