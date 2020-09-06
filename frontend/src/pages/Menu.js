import React, { useEffect } from 'react';

const Menu = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Speisekarte';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    return (
        <div>
            Menu
        </div>
    );
};

export default Menu;
