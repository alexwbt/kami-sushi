import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const Background = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
`;

const Model = styled.div`
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75);
    transform: translate(-50%, -50%);
    background-color: #333;
    display: inline-block;
    text-align: center;
    position: fixed;
    font-size: 20px;
    padding: 20px;
    color: white;
    left: 50%;
    top: 50%;

    @media (max-width: 700px) {
        font-size: 12px;
    }
`;

const Title = styled.div`
    border-bottom: 1px solid grey;
    padding-bottom: 10px;
`;

const Input = styled.input`
    ${props => props.noPadding ? '' : 'padding: 5px 10px;'}
    font-size: 20px;
    margin: 5px 0;

    @media (max-width: 700px) {
        font-size: 12px;
    }
`;

const Label = styled.label`
    margin-top: 10px;
    text-align: left;
    display: block;
`;

const Button = styled.div`
    ${props => props.margin ? 'margin-top: 20px;' : 'margin: 5px 0;'}
    background-color: grey;
    padding: 5px;
    cursor: pointer;
    :hover {
        background-color: black;
    }
`;

const Error = styled.div`
    color: ${props => props.theme.red};
    margin-top: 10px;
`;

const MenuForm = ({ data }) => {
    const [direction, setDirection] = useState(data?.direction);
    const [error, setError] = useState('');

    const switchDirection = useCallback(() => {
        setDirection(direction => !direction);
    }, []);

    return (
        <Background>
            <Model>
                <Title>{data ? 'Edit' : 'Create'} Menu</Title>
                <Label>
                    Name<br />
                    <Input />
                </Label>
                <Label>
                    Column<br />
                    <Input size={1} placeholder={2} /> - <Input size={1} placeholder={4} />
                </Label>
                <Label>
                    Padding<br />
                    <Input size={1} placeholder={5} />
                </Label>
                <Label>
                    Direction<br />
                    <Button onClick={switchDirection}>{direction ? 'Horizontal' : 'Vertical'}</Button>
                </Label>
                <Label>
                    Banner<br />
                    <Input type="file" noPadding />
                </Label>
                <Button margin>Submit</Button>
                {error && <Error>{error}</Error>}
            </Model>
        </Background>
    );
};

export default MenuForm;
