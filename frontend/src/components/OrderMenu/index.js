import React, { useState, useCallback, useEffect } from 'react';
import { api } from 'services';
import styled from 'styled-components';
import ItemList from './ItemList';

const { REACT_APP_API_SERVER } = process.env;

const Container = styled.div`
    user-select: none;
`;

const Banner = styled.img`
    display: block;
    object-fit: cover;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
`;

const SelectMenu = styled.div`
    position: sticky;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
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

const SelectMenuButton = styled.div`
    display: inline-block;
    padding: 10px;
    color: ${props => props.selected ? 'white' : props.theme.secondaryText};
    background-color: ${props => props.theme.dark};
    cursor: pointer;

    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const SelectMenuButtonComp = ({ data, i, changeMenu, menu }) => {
    const selectMenu = useCallback(() => changeMenu(i, data), [i, changeMenu, data]);
    return <SelectMenuButton key={i} selected={menu === i} onClick={selectMenu}>{data.name}</SelectMenuButton>;
};

const OrderMenu = ({ updatedMenu, onClickItem, onClickMenu, order }) => {
    const [menu, setMenu] = useState(0);
    const [menus, setMenus] = useState(null);
    const [items, setItems] = useState(null);
    const [mountList, setMountList] = useState(true);

    const changeMenu = useCallback((menu, data) => {
        setMenu(i => {
            if (menu !== i) setMountList(false);
            return menu;
        });
        onClickMenu && onClickMenu(data);
    }, [onClickMenu]);

    useEffect(() => { if (!mountList) setMountList(true); }, [mountList]);

    useEffect(() => {
        (async () => {
            const res = await api('/menu');
            if (res.status === 200 && res.success) {
                setMenus(res.menus.sort((a, b) => a.id - b.id));
                setItems(res.items.sort((a, b) => a.id - b.id));
                updatedMenu(res);
            }
        })();
    }, [updatedMenu]);

    return menus && items && menus[menu] ? <Container>
        {menus[menu].banner && <Banner src={`${REACT_APP_API_SERVER}/${menus[menu].banner}`} />}
        <SelectMenu>
            {
                menus.map((data, i) =>
                    <SelectMenuButtonComp key={i} {...{ data, i, changeMenu, menu }} />)
            }
        </SelectMenu>
        {
            mountList && <ItemList
                data={items.filter(i => i.menu_id === menus[menu].id)}
                onClick={onClickItem}
                order={order}
                {...menus[menu]}
            />
        }
    </Container> : <div></div>;
};

export default OrderMenu;
