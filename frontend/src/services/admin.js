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

export const createMenu = menu => {
    return api('/menu', {
        headers: {
            'Content-Type': 'multipart/form-data;'
        },
        method: 'POST',
        body: menu
    });
};
