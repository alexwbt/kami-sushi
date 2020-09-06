import React, { useEffect } from 'react';

const OrderNow = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Jetzt bestellen';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    return (
        <div>
            OrderNow
        </div>
    );
};

export default OrderNow;
