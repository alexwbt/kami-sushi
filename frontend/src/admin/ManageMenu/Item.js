import React, { useCallback } from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    padding: ${props => props.padding}px;
    :hover {
        padding: 0;
    }
`;

const ItemComponent = styled.div`
    position: relative;
    border-radius: ${props => props.padding}px;
    background-color: ${props => props.theme.dark};
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    animation: fadeIn 0.2s linear;
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    :hover {
        border: ${props => props.padding}px solid white;
    }
    cursor: pointer;
`;

const ItemImage = styled.img`
    display: block;
    border-radius: 10px 10px 0 0;
    width: 100%;
`;

const ItemDetail = styled.div`
    padding: 5px 15px 15px 15px;
`;

const ItemName = styled.div`
    font-size: 25px;
    overflow: hidden;
    @media (max-width: 900px) {
        font-size: 15px;
    }
`;

const ItemPrice = styled.div`
    padding: 3px 0;
    color: ${props => props.theme.currency};
    font-size: 20px;
    @media (max-width: 900px) {
        font-size: 14px;
    }
`;

const ItemDescription = styled.div`
    font-size: 18px;
    color: ${props => props.theme.secondaryText};
    @media (max-width: 900px) {
        font-size: 13px;
    }
`;

const Item = ({ item, add, padding }) => {
    const addToOrder = useCallback(() => add(item, 1), [add, item]);

    return (
        <ItemWrapper padding={padding}>
            <ItemComponent onClick={addToOrder} padding={padding}>
                <ItemImage src={item.image} />
                <ItemDetail>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>{`€${item.price}`.replace(/\./g, ',')}</ItemPrice>
                    <ItemDescription>{item.description}</ItemDescription>
                </ItemDetail>
            </ItemComponent>
        </ItemWrapper>
    );
};

export default Item;
