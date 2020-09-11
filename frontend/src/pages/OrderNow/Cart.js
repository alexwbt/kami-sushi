import React, { useCallback, useState } from "react";
import styled from 'styled-components';
import CartItem from "./CartItem";
import { useEffect } from "react";

const Button = styled.div`
    border-radius: 10px;
    padding: 10px;
    max-width: 400px;
    margin: auto;
    border: 3px solid white;
    background-color: ${props => props.theme.green};
    color: white;
    text-align: center;
    cursor: pointer;
    z-index: 1;
`;

const ButtonWrapper = styled.div`
    position: sticky;
    right: 0;
    bottom: 0;
    padding: 7px 20px;
    background-color: ${props => props.theme.grey};
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
`;

const Container = styled.div`
    background-color: white;
    flex-direction: column;
    position: fixed;
    display: flex;
    z-index: 2;
    bottom: 0;
    right: 0;
    top: 0;

    animation: ${props => props.animate} 0.15s linear forwards;
    @keyframes slideUp {
        from { transform: translateY(100vh); }
        to { transform: 0; }
    }
    @keyframes slideDown {
        from { transform: 0; }
        to { transform: translateY(100vh); }
    }

    @media (max-width: 1200px) {
        left: 0;
    }

    @media (min-width: 1200px) {
        position: fixed;
        bottom: 134px;
        width: 400px;
        top: 112px;
        flex: 0;
    }
`;

const ContainerPadding = styled.div`
    background-color: #f8f8f8;
    width: 400px;
    height: calc(100vh - 134px - 112px);

    @media (max-width: 1200px) {
        display: none;
    }
`;

const CloseButton = styled.div`
    position: absolute;
    opacity: 0.3;
    height: 30px;
    width: 30px;
    right: 5px;
    top: 5px;

    :hover {
        opacity: 1;
    }
    :before, :after {
        background-color: #333;
        position: absolute;
        height: 30px;
        content: '';
        left: 13px;
        width: 2px;
    }
    :before {
        transform: rotate(45deg);
    }
    :after {
        transform: rotate(-45deg);
    }

    @media (min-width: 1200px) {
        display: none;
    }
`;

const Title = styled.div`
    text-align: center;
    margin-top: 10px;
    font-size: 30px;
    padding: 10px;
    display: flex;

    :before, :after {
        flex: 1;
        content: '';
        margin: auto 10px;
        height: 1px;
        width: 10vw;
        background-color: grey;
    }
`;

const Empty = styled.div`
    color: ${props => props.theme.secondaryText};
    text-align: center;
    font-size: 30px;
    margin: 30px;
    flex: 1;
`;

const Items = styled.div`
    overflow: auto;
    flex: 1;
`;

const Bottom = styled.div`
    border-top: 1px solid black;
    padding-bottom: 10px;
    margin: 0 10px;
`;

const Total = styled.div`
    padding: 5px 0 20px 0;
    font-size: 20px;
    display: flex;

    span {
        color: ${props => props.theme.currencyDark};
        font-family: Arial;
        margin-left: auto;
    }
`;

const Cart = ({ order, add }) => {
    const [open, setOpen] = useState(null);

    const toggleCart = useCallback(() => {
        if (window.innerWidth < 1200) setOpen(open => {
            document.body.style.overflow = open ? 'auto' : 'hidden';
            return !open
        });
    }, []);

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth >= 1200)
                setOpen(true);
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return <>
        {
            window.innerWidth < 1200 && <ButtonWrapper>
                <Button onClick={toggleCart}>BESTELLLISTE</Button>
            </ButtonWrapper>
        }
        {
            open !== null && order && <Container animate={open ? 'slideUp' : 'slideDown'}>
                <CloseButton onClick={toggleCart} />
                <Title>BESTELLLISTE</Title>
                {
                    order.length > 0 ?
                        <Items>
                            {order.map((item, i) => <CartItem key={i} item={item} add={add} />)}
                        </Items> : <Empty>LEER...</Empty>
                }
                <Bottom>
                    <Total>gesamt<span>{`€${order.reduce((total, item) => Math.round((total + item.price * item.count) * 100) / 100, 0)}`.replace(/\./g, ',')}</span></Total>
                    <Button>BESTELLEN</Button>
                </Bottom>
            </Container>
        }
        <ContainerPadding />
    </>;
};

export default Cart;
