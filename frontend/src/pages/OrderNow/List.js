import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';
import { useRef } from 'react';

const Container = styled.div`
    position: relative;
    background-color: ${props => props.theme.darkBlue};
    color: white;
    padding: 10px;

    @media (min-width: 1500px) {
        padding: 10px 10vw;
    }
`;

const Column = styled.div`
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: ${props => props.width}%;
`;

const Empty = styled.div`
    background-color: ${props => props.theme.darkBlue};
    height: ${props => props.height};
`;

const List = ({ add, data, order, min_column = 2, max_column = 4, padding = 5, direction }) => {
    const [columnCount, setCount] = useState(1);
    const container = useRef(null);

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

    if (order === null) return <Empty height={container.current ? container.current.clientHeight : '100vh'} />;
    const divide = Math.ceil(data.length / columnCount);
    const mapFunction = (item, i) => <Item key={i} item={item} add={add} padding={padding} direction={direction} count={order.find(o => o.id === item.id)?.count} />;
    return (
        <Container ref={container}>
            {Array(columnCount).fill().map((e, i) => <Column key={i} width={100 / columnCount}>{data.slice(divide * i, divide * (i + 1)).map(mapFunction)}</Column>)}
        </Container>
    );
};

export default List;
