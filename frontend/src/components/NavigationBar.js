import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import BrandImg from 'resource/brand.png';

const Bar = styled.div`
    padding: 20px 15px;
    text-align: center;
    background-color: black;
    color: white;
`;

const Brand = styled.img`
    display: inline-block;
    vertical-align: middle;
    margin: 0 20px;
    font-size: 45px;
    cursor: pointer;
    height: 72px;
    object-fit: cover;

    @media (max-width: 500px) {
        height: 45px;
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
    const orderNow = useCallback(() => history.push('/jetzt-bestellen'), [history]);
    const menu = useCallback(() => history.push('/speisekarte'), [history]);
    const home = useCallback(() => history.push('/'), [history]);
    const contact = useCallback(() => history.push('/kontakt'), [history]);
    const imprint = useCallback(() => history.push('/impressum'), [history]);

    return (
        <Bar>
            <Item onClick={orderNow}>Bestellen</Item>
            <Item onClick={menu}>Speisekarte</Item>
            <Brand onClick={home} src={BrandImg}></Brand>
            <Item onClick={contact}>Kontakt</Item>
            <Item onClick={imprint}>Impressum</Item>
        </Bar>
    );
};

export default NavigationBar;
