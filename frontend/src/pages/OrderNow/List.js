import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
    position: relative;
    background-color: ${props => props.theme.grey};
    color: white;

    @media (min-width: 1200px) {
        padding: 0 5vw;
    }

    @media (min-width: 1500px) {
        padding: 0 15vw;
    }

    @media (min-width: 1800px) {
        padding: 0 20vw;
    }
`;

const Column = styled.div`
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 25%;

    @media (max-width: 900px) {
        width: 33.33%;
    }

    @media (max-width: 600px) {
        width: 50%;
    }
`;

const List = ({ add, data, order }) => {
    const [columnCount, setCount] = useState(1);
    const [mount, setMount] = useState(true);

    useEffect(() => { setMount(false) }, [data]);
    useEffect(() => { if (!mount) setMount(true) }, [mount]);

    useEffect(() => {
        const resize = () => {
            let count = 2;
            if (window.innerWidth > 600) count++;
            if (window.innerWidth > 900) count++;
            setCount(count);
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    if (!mount || order === null) return null;
    const divide = Math.ceil(data.length / columnCount);
    const mapFunction = (item, i) => <Item key={i} item={item} add={add} count={order.find(o => o.id === item.id)?.count} />;
    return (
        <Container>
            <Column>{data.slice(0, divide).map(mapFunction)}</Column>
            {columnCount > 1 && <Column>{data.slice(divide, divide * 2).map(mapFunction)}</Column>}
            {columnCount > 2 && <Column>{data.slice(divide * 2, divide * 3).map(mapFunction)}</Column>}
            {columnCount > 2 && <Column>{data.slice(divide * 3).map(mapFunction)}</Column>}
        </Container>
    );
};

export default List;
