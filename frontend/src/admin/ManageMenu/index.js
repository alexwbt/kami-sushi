import OrderMenu from 'components/OrderMenu';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemForm from './ItemForm';
import MenuForm from './MenuForm';

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
    color: white;
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

const ManageMenu = () => {
    const [hasMenu, setHasMenu] = useState(true);
    const [menuId, setMenuId] = useState(0);
    const [openForm, setOpenForm] = useState(false);

    const updatedMenu = useCallback(res => {
        setHasMenu(res.menus.length > 0)
    }, []);

    const getData = useCallback(() => {
        setHasMenu(null);
    }, []);

    useEffect(() => {
        if (hasMenu === null) setHasMenu(true);
    }, [hasMenu]);

    const closeForm = useCallback(() => { setOpenForm(false); }, []);
    const createMenu = useCallback(() => { setOpenForm('menu'); }, []);
    const editMenu = useCallback(data => { if (data.id === menuId) setOpenForm(data); else setMenuId(data.id) }, [menuId]);
    const createItem = useCallback(() => { setOpenForm('item'); }, []);
    const editItem = useCallback(data => { setOpenForm(data); }, []);

    return <>
        {
            hasMenu && <Container>
                <CreateButtons>
                    <Button onClick={createMenu}>Create Menu</Button>
                    <Button onClick={createItem}>Create Item</Button>
                </CreateButtons>
                <OrderMenu updatedMenu={updatedMenu} onClickItem={editItem} onClickMenu={editMenu} />
            </Container>
        }
        {
            !hasMenu && <Empty>
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
            && <ItemForm menuId={menuId} closeForm={closeForm} getData={getData} data={typeof openForm === 'object' && openForm} />
        }
    </>;
};

export default ManageMenu;
