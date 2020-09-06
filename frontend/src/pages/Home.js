import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import InfoBlock from '../components/InfoBlock';
import Generic from '../resource/generic.jpg';

const Header = styled.div`
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    min-height: 150px;
    object-fit: cover;
`;

const OrderNow = styled.div`
    position: absolute;
    top: 100%;
    left: 50%;
    padding: 15px 30px;
    transform: translate(-50%, -50%);
    border: 2px outset white;
    color: white;
    background-color: ${props => props.theme.dark};
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
    cursor: pointer;

    font-size: 18px;
    font-weight: bold;
    text-align: center;

    :focus {
        outline: none;
    }

    :hover {
        color: ${props => props.theme.red};
    }

    @media (${props => props.theme.mobile}) {
        padding: 10px;
        width: 70%;
        /* font-size: 10px; */
    }
`;

const Home = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Home';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    const history = useHistory();

    const orderNow = useCallback(() => {
        history.push('/jetzt-bestellen');
    }, [history]);

    return (
        <>
            <Header>
                <Image src={Generic}></Image>
                <OrderNow onClick={orderNow}>JETZT BESTELLEN</OrderNow>
            </Header>
            <InfoBlock />
        </>
    );
};

export default Home;
