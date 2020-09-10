
export const api = async (url, options = {}) => {
    try {
        const res = await fetch(process.env.REACT_APP_API_SERVER + url, {
            ...options,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                ...options.headers
            },
            credentials: 'include'
        });
        return { status: res.status, ...await res.json() };
    } catch (err) {
        return err;
    }
};
