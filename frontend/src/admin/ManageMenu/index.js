import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import List from './List';
import MenuForm from './MenuForm';
import ItemForm from './ItemForm';
import { api } from 'services';
import { useEffect } from 'react';

const { REACT_APP_API_SERVER } = process.env;

const Menus = styled.div`
    position: sticky;
    top: 0;
    background-color: ${props => props.theme.darkGrey};
    padding: 10px;
    font-size: 20px;
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

const Menu = ({ data, i, setMenu, menu, editMenu }) => {
    const selectMenu = useCallback(() => {
        setMenu(i);
        if (menu === i) editMenu(data);
    }, [i, setMenu, editMenu, menu, data]);
    return <MenuLink key={i} selected={menu === i} onClick={selectMenu}>{data.name}</MenuLink>
};

const ManageMenu = () => {
    const [menus, setMenus] = useState(null);
    const [items, setItems] = useState(null);
    const [menu, setMenu] = useState(0);
    const [openForm, setOpenForm] = useState(false);

    const getData = useCallback(async () => {
        const res = await api('/menu');
        if (res.status === 200 && res.success) {
            setMenus(res.menus);
            setItems(res.items);
        }
    }, []);

    useEffect(() => { getData(); }, [getData]);

    const closeForm = useCallback(() => { setOpenForm(false); }, []);
    const createMenu = useCallback(() => { setOpenForm('menu'); }, []);
    const editMenu = useCallback(data => { setOpenForm(data); }, []);
    const createItem = useCallback(() => { setOpenForm('item'); }, []);
    const editItem = useCallback(data => { setOpenForm(data); }, []);

    return menus && items && (
        <>
            {
                menus.length > 0 && <Container>
                    <CreateButtons>
                        <Button onClick={createMenu}>Create Menu</Button>
                        <Button onClick={createItem}>Create Item</Button>
                    </CreateButtons>
                    {menus[menu].banner && <Banner src={`${REACT_APP_API_SERVER}/${menus[menu].banner}`} />}
                    <Menus>
                        {menus.sort((a, b) => a.id - b.id).map((data, i) => <Menu key={i} {...{ data, i, setMenu, menu, editMenu }} />)}
                    </Menus>
                    <List {...menus[menu]} data={items.filter(i => i.menu_id === menus[menu].id).sort((a, b) => a.id - b.id)} editItem={editItem} />
                </Container>
            }
            {
                menus.length === 0 && <Empty>
                    <div>No menu...</div>
                    <Button onClick={createMenu}>Create Menu</Button>
                </Empty>
            }
            {
                (openForm === 'menu' || (typeof openForm === 'object' && openForm.menu_id === undefined))
                && <MenuForm closeForm={closeForm} getData={getData} data={typeof openForm === 'object' && openForm} />
            }
            {
                (openForm === 'item' || (typeof openForm === 'object' && openForm.menu_id !== undefined))
                && <ItemForm menuId={menus[menu].id} closeForm={closeForm} getData={getData} data={typeof openForm === 'object' && openForm} />
            }
        </>
    );
};

export default ManageMenu;
