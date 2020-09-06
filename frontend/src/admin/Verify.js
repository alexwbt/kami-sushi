import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    min-height: 100vh;
    position: relative;
    background-color: black;
`;

const Panel = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: ${props => props.theme.dark};
`;

const TokenInput = styled.input`
    font-size: 20px;
    padding: 10px 15px;
`;

const PanelSecondaryText = styled.div`
    display: inline-block;
    color: gray;
    font-size: 15px;
    padding: 10px;
    max-width: 300px;
`;

const PanelText = styled.div`
    color: white;
    font-size: 20px;
    padding: 10px;
`;

const PanelButton = styled.button`
    display: inline-block;
    color: white;
    font-size: 20px;
    padding: 10px;
    margin-left: 10px;
    background-color: black;
    cursor: pointer;
    font-family: inherit;
`;

const SetTokenLink = styled.span`
    color: white;
    text-decoration: underline;
    cursor: pointer;
`;

const Verify = ({ setToken }) => {
    const [sentToken, setSentToken] = useState(false);
    const [input, setInput] = useState('');

    const submitUsername = useCallback(() => {
        setSentToken(true);
        setInput('');
    }, []);

    const submitToken = useCallback(() => {
        setTimeout(() => {
            setToken(input);
        }, 100);
        setInput('');
    }, [input, setToken]);

    const onInput = useCallback(e => {
        setInput(e.target.value);
    }, []);

    const EnterToken = <>
        <PanelText>
            Enter the verify token.
        </PanelText>
        <TokenInput value={input} onChange={onInput} />
        <PanelButton onClick={submitToken}>Submit</PanelButton>
    </>;

    const EnterUsername = <>
        <PanelText>
            Enter a name for this device.
        </PanelText>
        <TokenInput value={input} onChange={onInput} />
        <PanelButton onClick={submitUsername}>Submit</PanelButton>
        <br />
        <PanelSecondaryText>
            You haven't login as admin with this device before or your login token has been cleared.
            Click <SetTokenLink onClick={submitUsername}>here</SetTokenLink> to set token directly.
        </PanelSecondaryText>
    </>;

    return (
        <Container>
            <Panel>{sentToken ? EnterToken : EnterUsername}</Panel>
        </Container>
    );
};

export default Verify;
