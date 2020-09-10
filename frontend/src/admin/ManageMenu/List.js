import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
    flex: 1;
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
    width: ${props => props.width}%;
`;

const List = ({ add, data, min_column = 2, max_column = 4, padding }) => {
    const [columnCount, setCount] = useState(1);

    useEffect(() => {
        const resize = () => {
            let count = min_column;
            if (window.innerWidth > 600) count = Math.round((min_column + max_column) / 2);
            if (window.innerWidth > 900) count = max_column;
            setCount(count);
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [min_column, max_column]);

    const divide = Math.ceil(data.length / columnCount);
    const mapFunction = (item, i) => <Item key={i} item={item} add={add} padding={padding} />;
    return (
        <Container>
            {Array(columnCount).fill().map((e, i) => <Column key={i} width={100 / columnCount}>{data.slice(divide * i, divide * (i + 1)).map(mapFunction)}</Column>)}
        </Container>
    );
};

export default List;
