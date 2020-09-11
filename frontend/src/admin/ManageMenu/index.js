import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import List from './List';
import MenuForm from './MenuForm';
import { api } from 'services';
import { useEffect } from 'react';

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

const Button = styled.div`
    display: inline-block;
    margin: 5px;
    background-color: grey;
    font-size: 15px;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    :hover {
        background-color: black;
    }
`;

const CreateButtons = styled.div`
    background-color: #333;
    padding: 10px 0;
`;

const Menu = ({ data, i, setMenu, menu }) => {
    const selectMenu = useCallback(() => setMenu(i), [i, setMenu]);
    return <MenuLink key={i} selected={menu === i} onClick={selectMenu}>{data.name}</MenuLink>
};

const ManageMenu = () => {
    const [menus, setMenus] = useState(null);
    const [items, setItems] = useState(null);
    const [menu, setMenu] = useState(0);
    const [menuForm, setMenuForm] = useState(false);

    const getData = useCallback(async () => {
        const res = await api('/menu');
        if (res.status === 200 && res.success) {
            setMenus(res.menus);
            setItems(res.items);
        }
    }, []);

    useEffect(() => { getData(); }, [getData]);

    const toggleMenu = useCallback(() => {
        setMenuForm(open => !open);
    }, []);

    return menus && items && (
        <>
            {
                menus.length > 0 && <Container>
                    {menus[menu].banner && <Banner src={menus[menu].banner} />}
                    <CreateButtons>
                        <Button onClick={toggleMenu}>Create Menu</Button>
                        <Button onClick={toggleMenu}>Create Item</Button>
                    </CreateButtons>
                    <Menus>
                        {menus.map((data, i) => <Menu key={i} {...{ data, i, setMenu, menu }} />)}
                    </Menus>
                    <List add={() => { }} padding={menus[menu].padding} data={items} />
                </Container>
            }
            {
                menus.length === 0 && <Empty>
                    <div>No menu...</div>
                    <Button onClick={toggleMenu}>Create Menu</Button>
                </Empty>
            }
            {
                menuForm && <MenuForm toggleMenu={toggleMenu} getData={getData} />
            }
        </>
    );
};

export default ManageMenu;
