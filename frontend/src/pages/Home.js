import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import HomeImg from 'resource/home.png';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    height: calc(100vh - 112px);
    /* background: linear-gradient(151deg, rgba(105,105,115,1) 0%, rgba(14,19,40,1) 52%, rgba(5,26,45,1) 100%); */
    background: linear-gradient(151deg, rgba(14,19,36,1) 0%, rgba(0,0,0,1) 100%);
    overflow: hidden;

    @media (max-width: 500px) {
        height: calc(100vh - 85px);
    }
`;

const Image = styled.img`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);

    @media (min-width: 500px) {
        height: 80%;
    }

    @media (min-width: 1100px) {
        height: 90%;
        left: 40%;
    }

    @media (max-width: 500px) {
        transform: translate(-50%, -50%);
        height: 80%;
    }
`;

const Panel = styled.div`
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translate(-50%, -50%);
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
        transform: translate(-50%, -50%);
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

    @media (max-width: 900px) {
        margin-top: 30px;
    }

    @media (max-width: 500px) {
        font-size: 20px;
        padding: 10px 20px;
    }

    @media (max-height: 800px) {
        margin-top: 20px;
        font-size: 15px;
        padding: 5px 10px;
    }
`;

const Home = () => {
    const history = useHistory();
    const orderNow = useCallback(() => history.push('/jetzt-bestellen'), [history]);

    return (
        <Container>
            <Image src={HomeImg} />
            <Panel>
                <div>Sushi-Spezialitäten frisch zubereitet</div>
                <OrderNow onClick={orderNow}>JETZT BESTELLEN</OrderNow>
            </Panel>
        </Container>
    );
};

export default Home;
