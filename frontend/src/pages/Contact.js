import React, { useEffect } from 'react';

const Contact = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Kontakt';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    return (
        <div>
            conact
        </div>
    );
};

export default Contact;
