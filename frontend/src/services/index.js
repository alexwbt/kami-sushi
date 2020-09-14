
export const api = async (url, options = {}, noHeaders) => {
    try {
        const fetchOptions = {
            ...options,
            credentials: 'include'
        };
        if (!noHeaders) {
            fetchOptions.headers = {
                'Content-Type': 'application/json; charset=UTF-8',
                ...options.headers
            };
        }
        const res = await fetch(process.env.REACT_APP_API_SERVER + url, fetchOptions);
        return { status: res.status, ...await res.json() };
    } catch (err) {
        return err;
    }
};
