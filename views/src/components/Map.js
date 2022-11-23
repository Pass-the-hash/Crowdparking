import {useState} from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import {Draggable, GeoJson, Map} from "pigeon-maps";
import {
    Button,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import {NavigateNext, Close} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {useStore} from "../App";

import ParkingComponent from "./Parking";
import ChargingComponent from "./Charging";

// const default_coordinates = [37.971780, 23.726834]
const geoJSON= {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            23.712873458862305,
                            37.98537345872672
                        ],
                        [
                            23.709311485290527,
                            37.98537345872672
                        ],
                        [
                            23.70665073394775,
                            37.967816445106
                        ],
                        [
                            23.726606369018555,
                            37.96263987658932
                        ],
                        [
                            23.74716281890869,
                            37.96886524785879
                        ],
                        [
                            23.73583316802978,
                            37.983107182462135
                        ],
                        [
                            23.712873458862305,
                            37.98537345872672
                        ]
                    ]
                ]
            }
        }
    ]
};

export default function MapComponent () {

    const [anchor, setAnchor] = useState([37.971780, 23.726834]);
    const [content, setContent] = useState("")

    let dialog = useStore((state) => state.dialog);
    let ticket = useStore((state) => state.ticketType);
    // let component = useStore((state) => state.component)
    const setComponent = useStore((state) => state.setComponent);
    const setDialog = useStore((state) => state.setDialog);

    const navigate = useNavigate();

    const geoJSONtoPolygon = (array) => {
        let polygon = [];
        for (let i=0; i<array.length; i++){
            polygon.push([array[i][1], array[i][0]])
        }
        return polygon;
    }

    const isInside = (point, polygon) => {
        // ray-casting algorithm based on
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

        var x = point[0], y = point[1];

        var inside = false;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            var xi = polygon[i][0], yi = polygon[i][1];
            var xj = polygon[j][0], yj = polygon[j][1];

            // console.log((yi > y) !== (yj > y), x < (xj - xi) * (y - yi) / (yj - yi) + xi)
            var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
            // console.log(inside)

        }
        return inside;
    }

    const sendData = () => {
        axios
            .put('http://localhost:3000/map', {
                coordinates: anchor
            })
            .then((response) => {
                this.setState({text: response.data, component: <ChargingComponent/>});
            })
            .catch((error) => {
                this.setState({
                    text: error.message,
                    component:
                        <DialogContent dividers>
                            {this.state.text}
                        </DialogContent>
                });
                console.log(this.state.text)
            });
    }


        // let component;

        /*if (!this.state.component){
            this.setState({
                component:
            })
        }*/

        // let component =


    return (
        <Map defaultCenter={[37.971780, 23.726834]} defaultZoom={14} >

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

                        {content ? content : "Διάρκεια στάθμευσης: " + ticket}

                    </DialogContent>

                </Dialog>

                <Draggable offset={[60, 87]} anchor={anchor} onDragEnd={(anchor) => {
                    setAnchor(anchor)
                }}>
                    <img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Location_marker_pin_map_gps.png"
                         width={50} height={45} alt="Pigeon!" />
                </Draggable>

                <GeoJson
                    data={geoJSON}
                    styleCallback={(feature) => {
                        if (feature.geometry.type === "Polygon") return { strokeWidth: "4", stroke: "gray" };
                    }}
                />
                <Button
                    sx={{width:'60%', position: "absolute", left:'20%', bottom: "10%"}}
                    variant="contained"
                    color={"info"}
                    startIcon={<NavigateNext/>}
                    onClick={() => {
                        // console.log(this.state.component)
                        let polygon = geoJSONtoPolygon(geoJSON.features[0].geometry.coordinates[0])
                        if (isInside(anchor, polygon)){
                            // this.setState({component: <ParkingComponent/>})
                            // component = <ParkingComponent/>
                            /*navigate('/parking', {
                                state: {
                                    coordinates: anchor
                                }
                            });*/
                            localStorage.setItem('component-name', "ParkingComponent")
                            setComponent(<ParkingComponent/>)
                        } else {
                            console.log('Inside "else"')
                            setContent("Εισάγετε τη βελόνα εντός του πολυγώνου στάθμευσης.")
                            console.log(content)
                            console.log(dialog)
                            setDialog(true)
                            // Open()

                        }
                    }}
                >Δεσμευση</Button>
            </Map>
    );
}
