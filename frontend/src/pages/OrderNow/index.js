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
        direction: false,
        items: [
            {
                id: 0,
                name: 'item_1_TESTsitem_1_ TESTsitem_1_TESTsitem_1_ TESTs',
                description: 'description of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.23
            },
            {
                id: 1,
                name: 'item_2',
                description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 5.12
            },
            {
                id: 2,
                name: 'item_3',
                description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
            {
                id: 3,
                name: 'item_4',
                description: 'description of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
            {
                id: 4,
                name: 'item_5',
                description: 'description of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
            {
                id: 5,
                name: 'item_6',
                description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/f4/tori-karaage.jpg',
                price: 100.2
            },
            {
                id: 6,
                name: 'item_7',
                description: 'description of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/14/1f/c3/e5/20180813-210209-largejpg.jpg',
                price: 100.2
            },
            {
                id: 7,
                name: 'item_8',
                description: 'description of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
        ]
    },
    {
        name: 'Hosomaki',
        min_column: 1,
        max_column: 1,
        padding: 1,
        direction: true,
        items: [
            {
                id: 8,
                name: 'item_9',
                description: 'description of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bladescription of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
            {
                id: 9,
                name: 'item_10',
                description: 'description of this item bla bla bla',
                image: 'https://media-cdn.tripadvisor.com/media/photo-o/17/5b/c8/d0/shinsen.jpg',
                price: 100.2
            },
            {
                id: 10,
                name: 'item_11',
                description: '',
                image: '',
                price: 100.2
            },
            {
                id: 11,
                name: 'item_12 121212',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 12,
                name: 'item_13 131313',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 13,
                name: 'item_14',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 14,
                name: 'item_11',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 15,
                name: 'item_12 121212',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 16,
                name: 'item_13 131313',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 17,
                name: 'item_14',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 18,
                name: 'item_11',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 19,
                name: 'item_12 121212',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 20,
                name: 'item_13 131313',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 21,
                name: 'item_14',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 22,
                name: 'item_11',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 23,
                name: 'item_12 121212',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 24,
                name: 'item_13 131313',
                description: 'description of this item bla bla bla',
                image: '',
                price: 100.2
            },
            {
                id: 25,
                name: 'item_14',
                description: 'description of this item bla bla bla',
                image: '',
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

const Container = styled.div`
    user-select: none;
    
    @media (min-width: 1200px) {
        display: flex;
    }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Menu = ({ data, i, setMenu, menu }) => {
    const selectMenu = useCallback(() => setMenu(i), [i, setMenu]);
    return <MenuLink key={i} selected={menu === i} onClick={selectMenu}>{data.name}</MenuLink>
};

const OrderNow = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Jetzt bestellen';
        return () => document.title = 'KAMI SUSHI';
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

    if (data) return (
        <Container>
            <Left>
                {data[menu].banner && <Banner src={data[menu].banner} />}
                <Menus>{data.map((data, i) => <Menu key={i} {...{ data, i, setMenu, menu }} />)}</Menus>
                <List add={addToOrder} data={data[menu].items} {...data[menu]} order={order} />
            </Left>
            <Cart order={order} add={addToOrder} />
        </Container>
    );
    return (
        <LoadingContainer>
            <Loading />
        </LoadingContainer>
    );
};

export default OrderNow;
