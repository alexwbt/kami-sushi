import React from 'react';
import styled from 'styled-components';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import MakerImg from 'resource/marker.svg';

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

const MapSection = () => {
    return (
        <Container>
            <Map>
                <Mapbox
                    style={String("mapbox://styles/mapbox/streets-v9")}
                    containerStyle={{ height: '100%', width: '100%' }}
                    center={[6.879392, 51.428454]}
                    renderChildrenInPortal={true}
                    zoom={[15]}
                >
                    <Marker coordinates={[6.879412, 51.428450]}>
                        <MarkerStyled src={MakerImg} />
                    </Marker>
                </Mapbox>
            </Map>
        </Container>
    );
};

export default MapSection;
