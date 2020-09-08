import React, { useCallback } from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    padding: 10px;
`;

const ItemComponent = styled.div`
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
    padding: 5px 15px 15px 15px;
`;

const ItemName = styled.div`
    font-size: 25px;
    overflow: hidden;
`;

const ItemPrice = styled.div`
    padding: 3px 0;
    color: ${props => props.theme.currency};
    font-size: 20px;
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

const Item = ({ item, add, count }) => {
    const addToOrder = useCallback(() => add(item, 1), [add, item]);
    const subtractOrder = useCallback(() => add(item, -1), [add, item]);

    return (
        <ItemWrapper>
            <ItemComponent>
                <ItemImage src={item.item_image} />
                <ItemDetail>
                    <ItemName>{item.item_name}</ItemName>
                    <ItemPrice>{`€${item.price}`.replace(/\./g, ',')}</ItemPrice>
                    <ItemDescription>{item.item_description}</ItemDescription>
                    <Button bg='#55bb55' onClick={addToOrder}>zur Bestellung hinzufügen{count > 0 && ` (${count})`}</Button>
                    {count > 0 && <Button bg='#cc5555' onClick={subtractOrder}>entfernen einen</Button>}
                </ItemDetail>
            </ItemComponent>
        </ItemWrapper>
    );
};

export default Item;
