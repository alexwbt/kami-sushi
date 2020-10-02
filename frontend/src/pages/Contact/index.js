import React, { useEffect } from 'react';
import styled from 'styled-components';
import FormSection from './FormSection';
import MapSection from './MapSection';

const Container = styled.div`
    /* background-color: ${props => props.theme.darkBlue}; */
    color: ${props => props.theme.grey};
`;

const Contact = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Kontakt';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    return (
        <Container>
            <FormSection />
            <MapSection />
        </Container>
    );
};

export default Contact;
