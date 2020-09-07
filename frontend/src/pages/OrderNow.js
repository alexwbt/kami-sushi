import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderItemList from '../components/OrderItemList';
import Loading from '../components/Loading';

const fakeMenuData = [
    {
        name: 'Vorspeisen',
        items: [
            {
                id: 0,
                item_name: 'item_1_ TESTs',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
            },
            {
                id: 1,
                item_name: 'item_2',
                item_description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
            },
            {
                id: 2,
                item_name: 'item_3',
                item_description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
            },
            {
                id: 3,
                item_name: 'item_4',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
            },
            {
                id: 4,
                item_name: 'item_5',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
            },
            {
                id: 5,
                item_name: 'item_6',
                item_description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/f4/tori-karaage.jpg',
            },
            {
                id: 6,
                item_name: 'item_7',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/14/1f/c3/e5/20180813-210209-largejpg.jpg',
            },
            {
                id: 7,
                item_name: 'item_8',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
            },
        ]
    },
    {
        name: 'Hosomaki',
        items: [
        ]
    },
    {
        name: 'Nigiri',
        items: [
        ]
    },
    {
        name: 'Hosomaki',
        items: [

        ]
    }
]

const Menus = styled.div`
    position: sticky;
    top: 0;
    background-color: ${props => props.theme.darkGrey};
    padding: 10px;
    font-size: 20px;
    z-index: 1;
    text-align: center;
    white-space: nowrap;
    overflow: auto;
`;

const MenuLink = styled.div`
    display: inline-block;
    padding: 10px;
    color: ${props => props.selected ? 'white' : props.theme.secondaryText};
    border-radius: 10px;
    background-color: ${props => props.selected ? props.theme.dark : props.theme.darkGrey};
    cursor: pointer;
`;

const LoadingContainer = styled.div`
    background-color: black;
    text-align: center;
    height: 95vh;
    padding-top: 20vh;
`;

const OrderNow = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Jetzt bestellen';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    const [order, setOrder] = useState([]);
    const [menu, setMenu] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setData(fakeMenuData);
        }, 100);
    }, []);

    const addToOrder = useCallback((itemId, count) => {
        setOrder(order => {
            // const item = order.find(item => item.id === itemId);
            
            console.log(order);
            return order.concat('test');
            // if (item) {
            //     item.count += count;
            //     return order.filter(item => item.count > 0);
            // }
            // return order.concat({ id: itemId, count: 1 });
        });
        return 0;
    }, []);

    if (data) return <>
        <Menus>{data.map((data, i) => <MenuLink key={i} selected={menu === i} onClick={() => setMenu(i)}>{data.name}</MenuLink>)}</Menus>
        <OrderItemList add={addToOrder} data={data[menu].items} order={order} />
    </>;
    return <LoadingContainer><Loading /></LoadingContainer>;
};

export default OrderNow;
