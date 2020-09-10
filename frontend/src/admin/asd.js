import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    vertical-align: top;
    background-color: #555;
    color: white;
    padding: 10px;
    flex: 1;
`;

const Menu = styled.div`
    border-bottom: 1px solid white;
    padding: 20px;
    cursor: pointer;
    :hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const Item = styled.div`
    border-bottom: 1px solid white;
    padding: 20px;
    cursor: pointer;
    :hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const ManageMenu = ({ menus, items }) => {
    const [menu, setMenu] = useState(0);

    return (
        <Container>
            {menu === 0 && menus.map((menu, i) => <Menu onClick={() => setMenu(menu.id)} key={i}>{menu.name}</Menu>)}
            {menu > 0 && items.map((item, i) => item.menu_id === menu && <Item key={i}>{item.name}</Item>)}
        </Container>
    );
};

export default ManageMenu;
