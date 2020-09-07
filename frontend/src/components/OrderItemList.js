import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

const Container = styled.div`
    position: relative;
    background-color: ${props => props.theme.grey};
    color: white;

    @media (min-width: 1200px) {
        padding: 0 10vw;
    }

    @media (min-width: 1500px) {
        padding: 0 20vw;
    }
`;

const Column = styled.div`
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 33.33%;

    @media (max-width: 900px) {
        width: 50%;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const ItemWrapper = styled.div`
    padding: 10px;
`;

const Item = styled.div`
    border-radius: 10px;
    background-color: ${props => props.theme.dark};
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    animation: fadeIn 0.2s linear;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const ItemImage = styled.img`
border-radius: 10px 10px 0 0;
    width: 100%;
`;

const ItemDetail = styled.div`
    padding: 0 10px 10px 10px;
`;

const ItemName = styled.div`
    display: inline-block;
    font-size: 25px;
`;

const ItemDescription = styled.div`
    font-size: 18px;
    color: ${props => props.theme.secondaryText};
`;

const Button = styled.button`
    display: inline-block;
    padding: 3px 10px;
    margin: 10px 10px 0 0;
    font-family: inherit;
    font-size: 18px;
    color: inherit;
    background-color: ${props => props.bg};
    border-radius: 10px;
    border: none;
    cursor: pointer;

    :focus {
        outline: none;
    }
`;

const ItemComponent = ({ item, add }) => {
    const [count, setCount] = useState(0);

    const addToOrder = useCallback(() => {
        const itemCount = add(item.id, 1);
        setCount(itemCount);
    }, [add, item.id]);

    const subtractOrder = useCallback(() => {
        const itemCount = add(item.id, -1);
        setCount(itemCount);
    }, [add, item.id]);

    return (
        <ItemWrapper>
            <Item>
                <ItemImage src={item.item_image} />
                <ItemDetail>
                    <ItemName>{item.item_name}</ItemName>
                    <ItemDescription>{item.item_description}</ItemDescription>
                    <Button bg='#55bb55' onClick={addToOrder}>zur Bestellung hinzufügen{count > 0 && ` (${count})`}</Button>
                    {count > 0 && <Button bg='#cc5555' onClick={subtractOrder}>entfernen einen</Button>}
                </ItemDetail>
            </Item>
        </ItemWrapper>
    );
};

const OrderItemList = ({ add, data }) => {
    const [columnCount, setCount] = useState(1);

    useEffect(() => {
        const resize = () => {
            let count = 1;
            if (window.innerWidth > 600) count++;
            if (window.innerWidth > 900) count++;
            setCount(count);
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const divide = Math.ceil(data.length / columnCount);
    return (
        <Container>
            <Column>{data.slice(0, divide).map((item, i) => <ItemComponent key={i} item={item} add={add} />)}</Column>
            {columnCount > 1 && <Column>{data.slice(divide, divide * 2).map((item, i) => <ItemComponent key={i} item={item} add={add} />)}</Column>}
            {columnCount > 2 && <Column>{data.slice(divide * 2).map((item, i) => <ItemComponent key={i} item={item} add={add} />)}</Column>}
        </Container>
    );
};

export default OrderItemList;
