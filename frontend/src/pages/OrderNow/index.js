import Loading from 'components/Loading';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import List from './List';
import Cart from './Cart';

const fakeMenuData = [
    {
        name: 'Vorspeisen',
        min_column: 2,
        max_column: 4,
        padding: 5,
        banner: '/static/media/generic.caa7a501.jpg',
        items: [
            {
                id: 0,
                item_name: 'item_1_TESTsitem_1_ TESTsitem_1_TESTsitem_1_ TESTs',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.23
            },
            {
                id: 1,
                item_name: 'item_2',
                item_description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 5.12
            },
            {
                id: 2,
                item_name: 'item_3',
                item_description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
            {
                id: 3,
                item_name: 'item_4',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
            {
                id: 4,
                item_name: 'item_5',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
            {
                id: 5,
                item_name: 'item_6',
                item_description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/f4/tori-karaage.jpg',
                price: 100.2
            },
            {
                id: 6,
                item_name: 'item_7',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/14/1f/c3/e5/20180813-210209-largejpg.jpg',
                price: 100.2
            },
            {
                id: 7,
                item_name: 'item_8',
                item_description: 'description of this item bla bla bla',
                item_image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
        ]
    },
    {
        name: 'Hosomaki',
        min_column: 1,
        max_column: 1,
        padding: 1,
        items: [
            {
                id: 8,
                item_name: 'item_9',
                item_description: 'description of this item bla bla bla',
                item_image: '',
                price: 100.2
            },
            {
                id: 9,
                item_name: 'item_10',
                item_description: 'description of this item bla bla bla',
                item_image: '',
                price: 100.2
            },
            {
                id: 10,
                item_name: 'item_11',
                item_description: 'description of this item bla bla bla',
                item_image: '',
                price: 100.2
            },
            {
                id: 11,
                item_name: 'item_12 121212',
                item_description: 'description of this item bla bla bla',
                item_image: '',
                price: 100.2
            },
            {
                id: 12,
                item_name: 'item_13 131313',
                item_description: 'description of this item bla bla bla',
                item_image: '',
                price: 100.2
            },
            {
                id: 13,
                item_name: 'item_14',
                item_description: 'description of this item bla bla bla',
                item_image: '',
                price: 100.2
            },
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

    @media (max-width: 600px) {
        font-size: 15px;
        padding: 5px 10px;
    }
`;

const MenuLink = styled.div`
    display: inline-block;
    padding: 10px;
    color: ${props => props.selected ? 'white' : props.theme.secondaryText};
    border-radius: 10px;
    background-color: ${props => props.selected ? props.theme.dark : props.theme.darkGrey};
    cursor: pointer;

    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const LoadingContainer = styled.div`
    background-color: black;
    text-align: center;
    height: 95vh;
    padding-top: 20vh;
`;

const Banner = styled.img`
    display: block;
    object-fit: cover;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
`;

const Menu = ({ data, i, setMenu, menu }) => {
    const selectMenu = useCallback(() => setMenu(i), [i, setMenu]);
    return <MenuLink key={i} selected={menu === i} onClick={selectMenu}>{data.name}</MenuLink>
};

const OrderNow = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Jetzt bestellen';
        return () => document.title = 'KAMI SUSHI asdasd';
    }, []);

    const [order, setOrder] = useState(null);
    const [menu, setMenu] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setData(fakeMenuData);

            const order = JSON.parse(localStorage.getItem('order'));
            const newOrder = [];
            if (order) {
                for (const item of order) {
                    let menuItem = (() => {
                        for (const menu of fakeMenuData) {
                            const menuItem = menu.items.find(i => i.id === item.id);
                            if (menuItem) return menuItem;
                        }
                    })();
                    if (menuItem) newOrder.push({ ...menuItem, count: item.count });
                }
            }
            setOrder(newOrder);
        }, 100);
    }, []);

    useEffect(() => {
        if (order !== null) {
            localStorage.setItem('order', JSON.stringify(order.map(i => ({
                id: i.id,
                count: i.count
            }))));
        }
    }, [order]);

    const addToOrder = useCallback((item, count) => {
        setOrder(order => {
            const newOrder = [];
            let added = false;
            for (const oldItem of order) {
                if (oldItem.id === item.id) {
                    added = true;
                    const newCount = oldItem.count + count;
                    if (newCount > 0) newOrder.push({ ...item, count: Math.min(newCount, 99) });
                } else newOrder.push({ ...oldItem });
            }
            if (!added && count > 0) {
                newOrder.push({ ...item, count: Math.min(count, 99) });
            }
            return newOrder;
        });
    }, []);

    if (data) return <>
        {data[menu].banner && <Banner src={data[menu].banner} />}
        <Menus>{data.map((data, i) => <Menu key={i} {...{ data, i, setMenu, menu }} />)}</Menus>
        <List add={addToOrder} data={data[menu].items} {...data[menu]} order={order} />
        <Cart order={order} add={addToOrder} />
    </>;
    return <LoadingContainer><Loading /></LoadingContainer>;
};

export default OrderNow;
