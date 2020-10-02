import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import styled from 'styled-components';
import CartItem from "./CartItem";
import { faCashRegister } from '@fortawesome/free-solid-svg-icons'

const DesktopCartButton = styled.div`
    position: fixed;
    z-index: 1;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 30px;
    border-radius: 5px 0 0 5px;
    border: 2px solid white;
    border-right: 0;
    padding: 20px 5px;
    background-color: rgba(100, 255, 100, 0.5);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

    > * {
        vertical-align: middle;
    }

    ${props => props.open !== null ? `animation: ${props.open ? 'buttonSlideLeft' : 'buttonSlideRight'} 0.15s linear forwards;` : ''}
    @keyframes buttonSlideLeft {
        from { right: 0; }
        to { right: 400px; }
    }
    @keyframes buttonSlideRight {
        from { right: 400px; }
        to { right: 0; }
    }

    @media (max-width: 1200px) {
        display: none;
    }
`;

const MobileCartButton = styled.div`
    right: 0;
    bottom: 10px;
    position: sticky;
    padding: 7px 20px;
    border: 3px solid white;
    background-color: rgba(100, 200, 100, 0.7);
    font-weight: bold;
    border-radius: 3px;
    margin: 10px;
    color: white;
    text-align: center;

    @media (min-width: 1200px) {
        display: none;
    }
`;

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

const Container = styled.div`
    background-color: white;
    flex-direction: column;
    position: fixed;
    display: flex;
    z-index: 2;
    bottom: 0;
    right: 0;
    top: 0;

    @media (max-width: 1200px) {
        left: 0;

        animation: ${props => props.open ? 'slideUp' : 'slideDown'} 0.15s linear forwards;
        @keyframes slideUp {
            from { transform: translateY(100vh); }
            to { transform: 0; }
        }
        @keyframes slideDown {
            from { transform: 0; }
            to { transform: translateY(100vh); }
        }
    }

    @media (min-width: 1200px) {
        position: fixed;
        width: 400px;
        flex: 0;

        animation: ${props => props.open ? 'slideRight' : 'slideLeft'} 0.15s linear forwards;
        @keyframes slideLeft {
            from { width: 400px; }
            to { width: 0; }
        }
        @keyframes slideRight {
            from { width: 0; }
            to { width: 400px; }
        }
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
        ${props => props.open ? '' : 'display: none;'};
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
        setOpen(open => {
            document.body.style.overflow = open || window.innerWidth >= 1200 ? 'auto' : 'hidden';
            return !open
        });
    }, []);

    return <>
        <DesktopCartButton open={open} onClick={toggleCart}><FontAwesomeIcon icon={faCashRegister} /></DesktopCartButton>
        <MobileCartButton open={open} onClick={toggleCart}>BESTELLLISTE</MobileCartButton>
        {
            open !== null && order && <>
                <Container open={open}>
                    <CloseButton onClick={toggleCart} open={open} />
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
            </>
        }
    </>;
};

export default Cart;
