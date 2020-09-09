import { api } from 'services';

export const isLoggedIn = async () => {
    const res = await api('/auth');
    return res.status === 200 && res.success;
};

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
