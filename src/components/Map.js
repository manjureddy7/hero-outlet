import React, { useState } from 'react';
import InteractiveMap, { GeolocateControl, Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.REACT_APP_MAP_TOKEN;
const URL = process.env.REACT_APP_URL

const Map = () =>  {

    const [viewport, setViewPort ] = useState({
        width: "100%",
        height: 500,
        latitude: 12.95,
        longitude: 77.70,
        zoom: 16
    });

    const [markers, setMarkers] = useState([]);

    const [location, setLocation] = useState({latitude: 0, longitude: 0});
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const handleClick = ({lngLat: [longitude, latitude]}) => {
        setMarkers([{longitude, latitude}]);
        // pass this information yo backend
        console.log("Long & lat are", longitude, latitude)
        setLocation({
            ...location,
            latitude,
            longitude
        });
        setLatitude(latitude)
        setLongitude(longitude)
        console.log("Location is", location, latitude, longitude)
        fetch(`${URL}/location`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "latitude": latitude,
             "longitude": longitude
            })
        })
        .then(res => res.json())
        .then(data => console.log("data is", data))
        
    };

    const handleOutlet = () => {

    }

    return (
        <>
            <InteractiveMap
                mapboxApiAccessToken={TOKEN}
                onViewportChange={viewport => setViewPort(viewport)}
                {...viewport}
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                onClick={handleClick}
            >
                {markers.length
                ? markers.map((m, i) => (
                    <Marker {...m} key={i}>
                        <div>
                        <span className='locater'></span>
                        </div>
                    </Marker>
                    ))
                : null}
                <GeolocateControl
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
                />
        </InteractiveMap>
        <button onClick={handleOutlet}>Check for outlet</button>
      </>
    )
}

export default Map;