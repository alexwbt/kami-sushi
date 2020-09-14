import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
    position: relative;
    background-color: ${props => props.theme.darkBlue};
    color: white;
    padding: 10px;
    flex: 1;

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

const List = ({ editItem, data, min_column = 2, max_column = 4, padding = 5, direction }) => {
    const [columnCount, setCount] = useState(1);

    const openEditItemForm = useCallback(item => { editItem(item); }, [editItem]);

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
    const mapFunction = (item, i) => <Item key={i} item={item} add={openEditItemForm} padding={padding} direction={direction} />;
    return (
        <Container>
            {Array(columnCount).fill().map((e, i) => <Column key={i} width={100 / columnCount}>{data.slice(divide * i, divide * (i + 1)).map(mapFunction)}</Column>)}
        </Container>
    );
};

export default List;
