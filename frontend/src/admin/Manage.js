import React, { useEffect, useState } from 'react';
import { api } from 'services';
import styled from 'styled-components';
import ManageMenu from './ManageMenu';

const Container = styled.div`
    user-select: none;
    display: flex;
`;

const SideBar = styled.div`
    height: 100vh;
    background-color: #333;
    color: white;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`;

const SlideBarItem = styled.div`
    padding: 10px;
    background-color: black;
    cursor: pointer;
    margin: 1px;
    :hover {
        border: 1px solid white;
        margin: 0;
    }
`;

const User = styled.div`
    padding: 20px 10px;
`;

const Manage = ({ hasToken }) => {
    const [menus, setMenus] = useState(null);
    const [items, setItems] = useState(null);
    const [tab] = useState(0);

    useEffect(() => {
        (async () => {
            const res = await api('/menu');
            if (res.status === 200 && res.success) {
                setMenus(res.menus);
                setItems(res.items);
            }
        })();
    }, []);

    return (
        <Container>
            <SideBar>
                <User>Logged in as {hasToken}</User>
                <SlideBarItem>Online Order Menu</SlideBarItem>
            </SideBar>
            {tab === 0 && menus && items && <ManageMenu menus={menus} items={items} />}
        </Container>
    );
};

export default Manage;
