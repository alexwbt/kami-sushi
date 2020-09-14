import Loading from 'components/Loading';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import List from './List';
import Cart from './Cart';
import { api } from 'services';

const { REACT_APP_API_SERVER } = process.env;

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

const Menu = ({ data, i, changeMenu, menu }) => {
    const selectMenu = useCallback(() => changeMenu(i), [i, changeMenu]);
    return <MenuLink key={i} selected={menu === i} onClick={selectMenu}>{data.name}</MenuLink>
};

const OrderNow = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Jetzt bestellen';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    const [order, setOrder] = useState(null);
    const [menu, setMenu] = useState(0);
    const [menus, setMenus] = useState(null);
    const [items, setItems] = useState(null);
    const [mountList, setMountList] = useState(true);

    const changeMenu = useCallback(menu => {
        setMenu(menu);
        setMountList(false);
    }, []);

    useEffect(() => { if (!mountList) setMountList(true); }, [mountList]);

    useEffect(() => {
        (async () => {
            const res = await api('/menu');
            if (res.status === 200 && res.success) {
                setMenus(res.menus);
                setItems(res.items);
            }

            const order = JSON.parse(localStorage.getItem('order'));
            const newOrder = [];
            if (order) {
                for (const item of order) {
                    let menuItem = res.items.find(i => i.id === item.id);
                    if (menuItem) newOrder.push({ ...menuItem, count: item.count });
                }
            }
            setOrder(newOrder);
        })();
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

    if (menus && items && menus[menu]) return (
        <Container>
            <Left>
                {menus[menu].banner && <Banner src={`${REACT_APP_API_SERVER}/${menus[menu].banner}`} />}
                <Menus>{menus.sort((a, b) => a.id - b.id).map((data, i) => <Menu key={i} {...{ data, i, changeMenu, menu }} />)}</Menus>
                <List {...menus[menu]} add={addToOrder} data={items.filter(i => i.menu_id === menus[menu].id).sort((a, b) => a.id - b.id)} {...menus[menu]} order={mountList ? order : null} />
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
