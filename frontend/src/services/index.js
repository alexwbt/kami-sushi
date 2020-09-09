
export const api = async (url, options = {}) => {
    const res = await fetch(process.env.REACT_APP_API_SERVER + url, {
        ...options,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            ...options.headers
        },
        credentials: 'include'
    });
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.startsWith('application/json;')) return { status: res.status, ...await res.json() };
    else return { status: res.status, success: false, message: await res.text() };
};
