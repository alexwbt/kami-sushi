import React, { useState, useCallback } from "react";
import styled from 'styled-components';
import CartItem from "./CartItem";

const Button = styled.div`
    border-radius: 10px;
    padding: 10px;
    border: 3px solid white;
    background-color: ${props => props.theme.dark};
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
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 2;
    overscroll-behavior: none;

    animation: ${props => props.animate} 0.15s linear forwards;
    @keyframes slideUp {
        from { transform: translateY(100vh); }
        to { transform: 0; }
    }
    @keyframes slideDown {
        from { transform: 0; }
        to { transform: translateY(100vh); }
    }
`;

const CloseButton = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    opacity: 0.3;

    :hover {
        opacity: 1;
    }
    :before, :after {
        position: absolute;
        left: 15px;
        content: '';
        height: 30px;
        width: 2px;
        background-color: #333;
    }
    :before {
        transform: rotate(45deg);
    }
    :after {
        transform: rotate(-45deg);
    }
`;

const Title = styled.div`
    font-size: 30px;
    text-align: center;
    padding: 10px;
    display: flex;
    margin-top: 10px;

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
    padding: 30px;
    font-size: 30px;
    text-align: center;
    color: ${props => props.theme.secondaryText};
`;

const Items = styled.div`
    overflow: auto;
    flex: 1;
`;

const Bottom = styled.div`
    margin: 10px;
    border-top: 1px solid black;
`;

const Total = styled.div`
    font-size: 20px;
    display: flex;
    padding: 5px 0 10px 0;

    span {
        margin-left: auto;
        color: ${props => props.theme.currencyDark};
    }
`;

const Cart = ({ order, add }) => {
    const [open, setOpen] = useState(null);

    const toggleCart = useCallback(() => {
        setOpen(open => {
            document.body.style.overflow = open ? 'auto' : 'hidden';
            return !open
        });
    }, []);

    return <>
        <ButtonWrapper>
            <Button onClick={toggleCart}>BESTELLLISTE</Button>
        </ButtonWrapper>
        {
            open !== null && <Container animate={open ? 'slideUp' : 'slideDown'}>
                <CloseButton onClick={toggleCart} />
                <Title>BESTELLLISTE</Title>
                <Items>
                    {
                        order.length > 0 ? order.map((item, i) => <CartItem key={i} item={item} add={add} />) : <Empty>LEER...</Empty>
                    }
                </Items>
                <Bottom>
                    <Total>gesamt<span>{`€${order.reduce((total, item) => Math.round((total + item.price * item.count) * 100) / 100, 0)}`.replace(/\./g, ',')}</span></Total>
                    <Button>BESTELLEN</Button>
                </Bottom>
            </Container>
        }
    </>;
};

export default Cart;
