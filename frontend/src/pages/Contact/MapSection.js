import React, { useCallback, useState } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import MakerImg from 'resource/marker.svg';
import SatelliteImg from 'resource/satellite.png';
import StreetsImg from 'resource/streets.png';
import styled from 'styled-components';

const Container = styled.div`
    padding: 30px;

    @media (max-width: 700px) {
        padding: 20px;
    }
`;

const Map = styled.div`
    margin: auto;
    width: 80%;
    height: 500px;
    position: relative;

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const MarkerStyled = styled.img`
    width: 40px;
    height: 40px;
`;

const Mapbox = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiYWxleHdidCIsImEiOiJja2Y0dTFjNnAwMnNwMnJuMWx2ODUxbm12In0.JMLyyg0t5sxexDrmiFwUUQ'
});

const SatelliteButton = styled.div`
    background: url(${props => props.satellite ? SatelliteImg : StreetsImg});
    background-size: cover;
    border-radius: 5px;
    position: absolute;
    cursor: pointer;
    height: 30px;
    width: 30px;
    right: 5px;
    top: 5px;
`;

const MapSection = () => {
    const [style, setStyle] = useState(false);

    const toggleSatellite = useCallback(() => setStyle(style => !style), []);

    return (
        <Container>
            <Map>
                <Mapbox
                    style={String(`mapbox://styles/mapbox/${style ? 'satellite' : 'streets'}-v9`)}
                    containerStyle={{ height: '100%', width: '100%' }}
                    center={[6.879392, 51.428454]}
                    renderChildrenInPortal={true}
                    zoom={[15]}
                >
                    <Marker coordinates={[6.879412, 51.428450]}>
                        <MarkerStyled src={MakerImg} />
                    </Marker>
                </Mapbox>
                <SatelliteButton satellite={!style} onClick={toggleSatellite}></SatelliteButton>
            </Map>
        </Container>
    );
};

export default MapSection;
