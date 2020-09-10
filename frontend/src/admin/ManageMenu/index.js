import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import List from './List';
import MenuForm from './MenuForm';

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

const Banner = styled.img`
    display: block;
    object-fit: cover;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
`;

const Container = styled.div`
    user-select: none;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Empty = styled.div`
    font-size: 30px;
    padding: 30px;
    text-align: center;
    flex: 1;
`;

const Menu = ({ data, i, setMenu, menu }) => {
    const selectMenu = useCallback(() => setMenu(i), [i, setMenu]);
    return <MenuLink key={i} selected={menu === i} onClick={selectMenu}>{data.name}</MenuLink>
};

const ManageMenu = ({ menus, items }) => {
    const [menu, setMenu] = useState(0);

    const editItem = useCallback(() => { }, []);

    if (menus.length === 0) return (
        <>
            <Empty>No menu...</Empty>
            <MenuForm />
        </>
    );
    return menus && items && (
        <Container>
            {menus[menu].banner && <Banner src={menus[menu].banner} />}
            <Menus>{menus.map((data, i) => <Menu key={i} {...{ data, i, setMenu, menu }} />)}</Menus>
            <List add={editItem} padding={menus[menu].padding} data={items} />
        </Container>
    );
};

export default ManageMenu;
