import { api } from 'services';

export const submitUsername = async username => {
    return api('/auth', {
        method: 'POST',
        body: JSON.stringify({ username })
    });
};

export const submitToken = async token => {
    return api('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ token })
    });
};

export const createMenu = async menu => {
    return api('/menu', {
        method: 'POST',
        body: JSON.stringify(menu)
    })
};
