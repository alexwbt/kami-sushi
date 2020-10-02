import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
    position: relative;
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

const ItemList = ({ onClick, data, order, min_column = 2, max_column = 4, padding = 5, direction }) => {
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

    return <Container>
        {
            Array(columnCount).fill().map((e, i) => <Column
                key={i}
                width={100 / columnCount}>
                {
                    data.filter((e, j) => j % columnCount === i).map((item, i) => <Item
                        key={i}
                        item={item}
                        onClick={onClick}
                        padding={padding}
                        direction={direction}
                        count={order && order.find(o => o.id === item.id)?.count}
                    />)
                }
            </Column>)
        }
    </Container>;
};

export default ItemList;
