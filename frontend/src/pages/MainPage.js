import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Main from 'resource/main.png';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    height: 90vh;
`;

const Image = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Panel = styled.div`
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-40%, -75%);
    max-width: 40%;
    color: white;
    font-size: 60px;
    text-shadow: 0px 0px 15px rgba(0, 0, 0, 1);

    @media (max-width: 500px) {
        text-align: center;
        font-size: 30px;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -75%);
        width: 70%;
        max-width: 70%;
    }

    @media (max-height: 800px) {
        font-size: 25px;
    }
`;

const OrderNow = styled.div`
    display: inline-block;
    border: 2px outset white;
    margin-top: 100px;
    padding: 15px 30px;
    color: white;
    font-size: 30px;
    text-align: center;
    background-color: ${props => props.theme.dark};
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    cursor: pointer;

    :focus {
        outline: none;
    }

    :hover {
        color: ${props => props.theme.red};
    }

    @media (max-width: 500px) {
        margin-top: 30px;
        font-size: 20px;
        padding: 10px 20px;
    }

    @media (max-height: 800px) {
        margin-top: 20px;
        font-size: 15px;
        padding: 5px 10px;
    }
`;

const MainPage = () => {
    const history = useHistory();
    const orderNow = useCallback(() => history.push('/jetzt-bestellen'), [history]);

    return (
        <Container>
            <Image src={Main} />
            <Panel>
                <div>Sushi-Spezialitäten frisch zubereitet</div>
                <OrderNow onClick={orderNow}>JETZT BESTELLEN</OrderNow>
            </Panel>
        </Container>
    );
};

export default MainPage;
