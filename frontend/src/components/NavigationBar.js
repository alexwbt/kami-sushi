import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Bar = styled.div`
    padding: 30px 15px;
    text-align: center;
    background-color: ${props => props.theme.dark};
    color: white;
`;

const Brand = styled.div`
    display: inline-block;
    vertical-align: middle;
    margin: 0 20px;
    font-size: 45px;
    cursor: pointer;

    @media (max-width: 1100px) {
        font-size: 30px;
    }
`;

const Item = styled.div`
    display: inline-block;
    vertical-align: middle;
    padding: 0 50px;
    font-size: 20px;
    cursor: pointer;

    :hover {
        color: ${props => props.theme.red};
    }

    @media (max-width: 1100px) {
        display: none;
    }
`;

const NavigationBar = () => {
    const history = useHistory();

    const main = useCallback(() => {
        history.push('/');
        document.title = 'KAMI SUSHI';
    }, [history]);

    const home = useCallback(() => {
        history.push('/home');
        document.title = 'KAMI SUSHI - Home';
    }, [history]);

    const menu = useCallback(() => {
        history.push('/speisekarte');
        document.title = 'KAMI SUSHI - Speisekarte';
    }, [history]);

    const contact = useCallback(() => {
        history.push('/kontakt');
        document.title = 'KAMI SUSHI - Kontakt';
    }, [history]);

    const imprint = useCallback(() => {
        history.push('/impressum');
        document.title = 'KAMI SUSHI - Impressum';
    }, [history]);

    return (
        <Bar>
            <Item onClick={home}>Home</Item>
            <Item onClick={menu}>Speisekarte</Item>
            <Brand onClick={main}>KAMI SUSHI</Brand>
            <Item onClick={contact}>Kontakt</Item>
            <Item onClick={imprint}>Impressum</Item>
        </Bar>
    );
};

export default NavigationBar;
