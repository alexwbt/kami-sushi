import React, { useEffect } from 'react';

const Imprint = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Impressum';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    return (
        <div>
            Imprint
        </div>
    );
};

export default Imprint;
