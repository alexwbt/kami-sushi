import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { isLoggedIn } from 'services/admin';
import styled from 'styled-components';
import Manage from './Manage';
import Verify from './Verify';

const LoadingContainer = styled.div`
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    z-index: 1;

    ${Loading} {
        top: 45vh;
    }
`;

const Admin = () => {
    const [hasToken, setHasToken] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setHasToken(await isLoggedIn());
        })();
    }, []);

    return (
        <>
            {(hasToken === null || loading) && <LoadingContainer><Loading /></LoadingContainer>}
            {hasToken ? <Manage hasToken={hasToken} /> : <Verify setHasToken={setHasToken} setLoading={setLoading} />}
        </>
    );
};

export default Admin;
