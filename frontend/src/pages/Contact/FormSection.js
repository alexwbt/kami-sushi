import React from 'react';
import styled from 'styled-components';
import { Area, Button, Input, Label } from 'styles/form';

const Container = styled.div`
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    color: rgba(255, 255, 255, 0.5);
    text-align: center;

    @media (max-width: 700px) {
        padding: 20px;
    }
`;

const Form = styled.div`
    display: inline-block;
    background-color: ${props => props.theme.darkGrey};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px;

    @media (max-width: 1000px) {
        display: block;
    }
`;

const Title = styled.div`
    font-size: 50px;
    padding-bottom : 30px;
    font-weight: bold;
    color: ${props => props.theme.grey};
`;

const Paragraph = styled.div`
    font-size: 25px;
    padding-bottom: 30px;
    max-width: 900px;
    vertical-align: top;
    text-align: left;
    margin: auto;

    @media (max-width: 700px) {
        font-size: 18px;
    }
`;

const Info = styled.div`
    display: inline-block;
    width: 400px;
    vertical-align: top;
    padding: 10px 0 0 100px;
    text-align: left;

    @media (max-width: 1000px) {
        display: block;
        padding: 30px 0 0 0;
        width: 100%;
    }
`;

const InfoTitle = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: ${props => props.theme.grey};

    @media (max-width: 1000px) {
        font-size: 20px;
    }
`;

const InfoBlock = styled.div`
    display: inline-block;
    font-size: 20px;
    padding: 15px 0;

    @media (max-width: 1000px) {
        font-size: 17px;
    }
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    @media (max-width: 1000px) {
        padding: 10px 0;
    }
`;

const InfoRowBlock = styled.div`
    display: inline-block;
`;

const FormSection = () => {
    return (
        <Container>
            <Paragraph><Title>Ihr Kontakt zu uns</Title>Haben Sie Fragen zu unserem Restaurant, oder möchten Sie einen Tisch reservieren? Kontaktieren Sie uns einfach und bequem über das Kontaktformular, und wir setzen uns schnellstmöglich mit Ihnen in Verbindung. Wir freuen uns auf Ihre Anfrage!</Paragraph>
            <Form>
                <Label>
                    Name:<br />
                    <Input />
                </Label>
                <Label>
                    E-Mail-Adresse:<br />
                    <Input />
                </Label>
                <Label>
                    Telefon:<br />
                    <Input />
                </Label>
                <Label>
                    Nachricht:<br />
                    <Area />
                </Label>
                <Button>Senden</Button>
            </Form>
            <Info>
                <InfoTitle>Hier finden Sie uns:</InfoTitle>
                <InfoBlock>Friedrich-Ebert Strasse 46 45468 Mühlheim an der Ruhr</InfoBlock>
                <InfoTitle>Öffnungszeiten:</InfoTitle>
                <InfoRow>
                    <InfoRowBlock>Mo - Fr</InfoRowBlock>
                    <InfoRowBlock>12:00 - 15:00<br />17:00 - 21:30</InfoRowBlock>
                </InfoRow>
                <InfoRow>
                    <InfoRowBlock>Samstag</InfoRowBlock>
                    <InfoRowBlock>14:00 - 22:00</InfoRowBlock>
                </InfoRow>
                <InfoRow>
                    <InfoRowBlock>Sonntag</InfoRowBlock>
                    <InfoRowBlock>Geschlossen</InfoRowBlock>
                </InfoRow>
            </Info>
        </Container>
    );
};

export default FormSection;
