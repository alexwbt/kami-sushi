import React, { useCallback } from 'react';
import styled from 'styled-components';

const { REACT_APP_API_SERVER } = process.env;

const ItemWrapper = styled.div`
    padding: ${props => props.padding}px;
`;

const ItemComponent = styled.div`
    border: 2px solid ${props => props.theme.secondaryGrey};
    ${props => props.direction ? 'display: flex;' : ''}
    position: relative;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    animation: fadeIn 0.2s linear;
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    :hover {
        border: 2px solid white;
    }
    cursor: pointer;
`;

const ItemImage = styled.img`
    object-fit: cover;
    ${props => props.direction ? `
        max-width: 30%;
        @media (min-width: 1500px) {
            max-width: 15%;
        }
    ` : `
        width: 100%;
        display: block;
    `}
    border-radius: 2px 2px 0 0;
    pointer-events: none;
`;

const ItemDetail = styled.div`
    padding: 5px 15px 15px 15px;
    ${props => props.direction ? `
        flex: 1;
        display: inline-block;
        vertical-align: top;
    ` : ''}
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
    color: #887d33;
    @media (max-width: 900px) {
        font-size: 13px;
    }
`;

const Counter = styled.div`
    position: absolute;
    top: 3px;
    right: 3px;
    width: 20px;
    height: 20px;
    padding: 2px;
    border-radius: 20px;
    background-color: ${props => props.theme.green};
    color: white;
    text-align: center;
    line-height: 20px;
    font-family: Arial;
`;

const Item = ({ item, onClick, count, padding, direction }) => {
    const addToOrder = useCallback(() => onClick(item, 1), [onClick, item]);
    return <ItemWrapper padding={padding}>
        <ItemComponent onClick={addToOrder} padding={padding} direction={+direction}>
            {item.image && <ItemImage src={`${REACT_APP_API_SERVER}/${item.image}`} direction={+direction} />}
            <ItemDetail direction={+direction}>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{`€${item.price}`.replace(/\./g, ',')}</ItemPrice>
                <ItemDescription>{item.description}</ItemDescription>
                {count > 0 && <Counter>{count}</Counter>}
            </ItemDetail>
        </ItemComponent>
    </ItemWrapper>;
};

export default Item;
