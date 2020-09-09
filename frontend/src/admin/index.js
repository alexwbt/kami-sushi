import React, { useEffect, useState } from 'react';
import { isLoggedIn } from 'services/admin';
import Manage from './Manage';
import Verify from './Verify';



const Admin = () => {
    const [hasToken, setHasToken] = useState(null);

    useEffect(() => {
        (async () => {
            setHasToken(await isLoggedIn());
        })();
    }, []);

    if (hasToken) return <Manage hasToken={hasToken} />
    return <Verify setHasToken={setHasToken} load={hasToken === null} />;
};

export default Admin;
