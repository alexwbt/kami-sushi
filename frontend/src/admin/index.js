import React, { useEffect, useState, useCallback } from 'react';
import Manage from './Manage';
import Verify from './Verify';

const Admin = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('AdminToken'));
    }, []);

    const storeToken = useCallback((token) => {
        localStorage.setItem('AdminToken', token);
        setToken(token);
    }, []);

    if (token) return <Manage token={token} />
    return <Verify setToken={storeToken} />;
};

export default Admin;
