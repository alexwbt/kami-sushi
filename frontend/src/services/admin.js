import { api } from 'services';

export const submitUsername = username => {
    return api('/auth', {
        method: 'POST',
        body: JSON.stringify({ username })
    });
};

export const submitToken = token => {
    return api('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ token })
    });
};

export const menu = (menu, put) => {
    return api('/menu', {
        method: put ? 'PUT' : 'POST',
        body: menu
    }, true);
};

export const item = (item, put) => {
    return api('/item', {
        method: put ? 'PUT' : 'POST',
        body: item
    }, true);
};

export const deleteMenu = id => {
    return api('/menu', {
        method: 'DELETE',
        body: JSON.stringify({ id })
    });
};

export const deleteItem = id => {
    return api('/item', {
        method: 'DELETE',
        body: JSON.stringify({ id })
    });
};
