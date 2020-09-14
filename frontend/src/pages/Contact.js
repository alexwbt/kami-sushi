import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Area, Button, Input, Label } from 'styles/form';

const Container = styled.div`
    background-color: ${props => props.theme.darkBlue};
    color: ${props => props.theme.grey};
    text-align: center;
`;

const Title = styled.div`
    font-size: 50px;
    padding : 30px;
`;

const Paragraph = styled.div`
    display: inline-block;
    font-size: 25px;
    padding : 20px;
    max-width: 500px;
    vertical-align: top;
`;

const FormSection = styled.div`
    padding: 10px;
`;

const Form = styled.div`
    display: inline-block;
    background-color: ${props => props.theme.darkGrey};
    padding: 20px;
`;

const Contact = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Kontakt';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    return (
        <Container>
            <Title>Ihr Kontakt zu uns</Title>
            <FormSection>
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
                <Paragraph>Haben Sie Fragen zu unserem Restaurant, oder möchten Sie einen Tisch reservieren? Kontaktieren Sie uns einfach und bequem über das Kontaktformular, und wir setzen uns schnellstmöglich mit Ihnen in Verbindung. Wir freuen uns auf Ihre Anfrage!</Paragraph>
            </FormSection>
        </Container>
    );
};

export default Contact;
