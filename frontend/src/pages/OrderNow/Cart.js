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

    @media (min-width: 1200px) {
        display: flex;
        position: relative;
        min-width: 400px;
        flex: 0;
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
        left: 13px;
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

    @media (min-width: 1200px) {
        display: none;
    }
`;

const Title = styled.div`
    font-size: 30px;
    text-align: center;
    padding: 10px;
    display: flex;
    margin-top: 10px;

    @media (min-width: 1200px) {
        background-color: rgba(255, 255, 255, 0.75);
        position: sticky;
        z-index: 1;
        top: 0;
    }

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
    margin: 30px;
    font-size: 30px;
    text-align: center;
    color: ${props => props.theme.secondaryText};

    @media (min-width: 1200px) {
        position: sticky;
        top: 60px;
    }
`;

const Items = styled.div`
    overflow: auto;
    flex: 1;
`;

const Bottom = styled.div`
    margin: 0 10px;
    padding-bottom: 10px;
    border-top: 1px solid black;

    @media (min-width: 1200px) {
        position: sticky;
        background-color: rgba(255, 255, 255, 0.75);
        right: 0;
        bottom: 0;
        margin-top: auto;
    }
`;

const Total = styled.div`
    font-size: 20px;
    display: flex;
    padding: 5px 0 20px 0;

    span {
        margin-left: auto;
        color: ${props => props.theme.currencyDark};
        font-family: Arial;
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
    </>;
};

export default Cart;
