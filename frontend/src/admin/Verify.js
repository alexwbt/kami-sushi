import React, { useCallback, useState } from 'react';
import { submitToken, submitUsername } from 'services/admin';
import styled from 'styled-components';
import { useEffect } from 'react';

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

const ErrorMessage = styled.div`
    padding-top: 5px;
    color: ${props => props.theme.red};
`;

const Verify = ({ setHasToken, setLoading, error }) => {
    const [sentName, setSentName] = useState(false);
    const [input, setInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const submitName = useCallback(() => {
        (async () => {
            setLoading(true);
            const res = await submitUsername(input);
            setLoading(false);
            setInput('');
            setErrorMessage(res.message);
            setSentName(res.status === 200 && res.success);
        })();
    }, [input, setLoading]);

    const submitVerifyToken = useCallback(() => {
        (async () => {
            setLoading(true);
            const res = await submitToken(input);
            setLoading(false);
            setInput('');
            setErrorMessage(res.message);
            setHasToken(res.status === 200 && res.success);
        })();
    }, [input, setHasToken, setLoading]);

    const onInput = useCallback(e => {
        setInput(e.target.value);
    }, []);

    const toTokenInput = useCallback(() => {
        setSentName(true);
    }, []);

    const EnterToken = <>
        <PanelText>
            Enter the verify token.
        </PanelText>
        <TokenInput value={input} onChange={onInput} />
        <PanelButton onClick={submitVerifyToken}>Submit</PanelButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>;

    const EnterUsername = <>
        <PanelText>
            Enter a name for this device.
        </PanelText>
        <TokenInput value={input} onChange={onInput} />
        <PanelButton onClick={submitName}>Submit</PanelButton>
        <br />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <PanelSecondaryText>
            You haven't login as admin with this device before or your login token has been cleared.
            Click <SetTokenLink onClick={toTokenInput}>here</SetTokenLink> to set token directly.
        </PanelSecondaryText>
    </>;

    return (
        <Container>
            <Panel>{sentName ? EnterToken : EnterUsername}</Panel>
        </Container>
    );
};

export default Verify;
