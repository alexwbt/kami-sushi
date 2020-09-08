import React, { useCallback } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 20px;
    padding: 10px 0;
    margin: 0 30px;
    display: flex;
    min-width: 300px;
    border-bottom: 1px dashed #ccc;

    @media (max-width: 400px) {
        font-size: 15px;
    }
`;

const Name = styled.span`
    flex: 1;
    flex-shrink: 1;
    overflow: hidden;
`;

const Price = styled.span`
    padding-left: 3px;
    color: ${props => props.theme.currencyDark};
`;

const Count = styled.span`
    text-align: center;
`;

const Display = styled.input.attrs({
    type: 'number'
})`
    vertical-align: middle;
    display: inline-block;
    border: none;
    text-align: center;
    padding: 0;
    width: 25px;
`;

const CountButton = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 1px solid grey;
    color: grey;
    vertical-align: middle;
    text-align: center;
    line-height: 20px;
    margin: 0 5px;
    font-family: consolas;
    font-size: 20px;

    cursor: pointer;
    :hover {
        background-color: black;
        color: white;
    }
`;

const DeleteButton = styled.div`
    width: 20px;
    height: 20px;
    opacity: 0.3;
    position: relative;

    :hover {
        opacity: 1;
    }
    :before, :after {
        position: absolute;
        content: '';
        height: 20px;
        width: 2px;
        background-color: black;
    }
    :before {
        transform: rotate(45deg);
    }
    :after {
        transform: rotate(-45deg);
    }
`;

const CartItem = ({ item, add }) => {
    const addToOrder = useCallback(() => add(item, 1), [add, item]);
    const subtractOrder = useCallback(() => add(item, -1), [add, item]);
    const clear = useCallback(() => add(item, -item.count), [add, item]);
    const onChange = useCallback((e) => {
        const value = +e.target.value;
        if (value > 0 && value < 1000)
            add(item, value - item.count);
    }, [add, item]);
    return (
        <Wrapper>
            <DeleteButton onClick={clear} />
            <Name>{item.item_name}</Name>
            <Price>{`€${Math.round(item.price * item.count * 100) / 100}`.replace(/\./g, ',')}</Price>
            <Count>
                <CountButton onClick={subtractOrder}>-</CountButton>
                <Display value={item.count} onChange={onChange} />
                <CountButton onClick={addToOrder}>+</CountButton>
            </Count>
        </Wrapper>
    );
};

export default CartItem;
