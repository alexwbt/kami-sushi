import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { createMenu } from 'services/admin';

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

const CloseButton = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    opacity: 0.3;
    cursor: pointer;

    :hover {
        opacity: 1;
    }
    :before, :after {
        position: absolute;
        left: 13px;
        content: '';
        height: 30px;
        width: 2px;
        background-color: white;
    }
    :before {
        transform: rotate(45deg);
    }
    :after {
        transform: rotate(-45deg);
    }
`;

const useNumberInput = (defaultValue, min = 0, max = 100) => {
    const [value, setValue] = useState(defaultValue);

    const setNumberValue = useCallback(e => {
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        setValue(newValue ? Math.min(max, Math.max(min, +newValue)) : '');
    }, [min, max]);

    return [value, setNumberValue];
};

const useInput = defaultValue => {
    const [value, setValue] = useState(defaultValue);

    const setStringValue = useCallback(e => {
        setValue(e.target.value);
    }, []);

    return [value, setStringValue];
};

const MenuForm = ({ data, toggleMenu, getData }) => {
    const [error, setError] = useState('');
    const [name, setName] = useInput('');
    const [minCol, setMinCol] = useNumberInput('', 1, 5);
    const [maxCol, setMaxCol] = useNumberInput('', 1, 5);
    const [padding, setPadding] = useNumberInput('', 0, 10);
    const [direction, setDirection] = useState(data?.direction);

    const switchDirection = useCallback(() => {
        setDirection(direction => !direction);
    }, []);

    const submit = useCallback(async () => {
        const res = await createMenu({
            name,
            min_column: +minCol,
            max_column: +maxCol,
            padding: +padding,
            direction
        });
        if (res.status === 200 && res.success) {
            setError('');
            toggleMenu(false);
            getData();
        } else {
            setError(res.message);
        }
    }, [name, minCol, maxCol, padding, direction, toggleMenu, getData]);

    return (
        <Background>
            <Model>
                <CloseButton onClick={toggleMenu} />
                <Title>{data ? 'Edit' : 'Create'} Menu</Title>
                <Label>
                    Name<br />
                    <Input value={name} onChange={setName} />
                </Label>
                <Label>
                    Column<br />
                    <Input size={1} placeholder={2} value={minCol} onChange={setMinCol} />
                    <span> - </span>
                    <Input size={1} placeholder={4} value={maxCol} onChange={setMaxCol} />
                </Label>
                <Label>
                    Padding<br />
                    <Input size={1} placeholder={5} value={padding} onChange={setPadding} />
                </Label>
                <Label>
                    Direction<br />
                    <Button onClick={switchDirection}>{direction ? 'Horizontal' : 'Vertical'}</Button>
                </Label>
                <Label>
                    Banner<br />
                    <Input type="file" noPadding />
                </Label>
                <Button margin onClick={submit}>Submit</Button>
                {error && <Error>{error}</Error>}
            </Model>
        </Background>
    );
};

export default MenuForm;
