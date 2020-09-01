import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
    padding: 10px;
    text-align: center;
    color: grey;
    background-color: ${props => props.theme.darkGrey};

    @media (max-width: 600px) {
        font-size: 12px;
    }
`;

const Line = styled.hr`
    margin: 10px;
    border-color: #333333;
`;

const Contact = styled.div`
    color: ${props => props.theme.grey};
`;

const Link = styled.span`
    color: ${props => props.theme.grey};
    display: inline-block;
    padding: 10px 20px;
    text-decoration: underline;
`;

const Footer = () => {
    const history = useHistory();

    const contact = useCallback(() => {
        history.push('/kontakt');
        document.title = 'KAMI SUSHI - Kontakt';
    }, [history]);

    const imprint = useCallback(() => {
        history.push('/impressum');
        document.title = 'KAMI SUSHI - Impressum';
    }, [history]);

    return (
        <Container>
            <div>
                <Link onClick={contact}>Kontakt</Link>
                <Link onClick={imprint}>Impressum</Link>
            </div>
            <Contact>
                Rufen Sie uns an: 0208 94111444<br />
                Hier finden Sie uns: Friedrich-Ebert Strasse 46, 45468 Mühlheim an der Ruhr
            </Contact>
            <Line />
            Copyright © Alle Rechte vorbehalten.
        </Container>
    );
};

export default Footer;
