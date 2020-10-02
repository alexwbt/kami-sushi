import React, { useCallback, useEffect, useState } from 'react';
import OrderMenu from 'components/OrderMenu';
import Cart from './Cart';

const OrderNow = () => {
    useEffect(() => {
        document.title = 'KAMI SUSHI - Jetzt bestellen';
        return () => document.title = 'KAMI SUSHI';
    }, []);

    const [order, setOrder] = useState(null);

    const updatedMenu = useCallback((res) => {
        const order = JSON.parse(localStorage.getItem('order'));
        const newOrder = [];
        if (order) {
            for (const item of order) {
                let menuItem = res.items.find(i => i.id === item.id);
                if (menuItem) newOrder.push({ ...menuItem, count: item.count });
            }
        }
        setOrder(newOrder);
    }, []);

    useEffect(() => {
        if (order !== null) {
            localStorage.setItem('order', JSON.stringify(order.map(i => ({
                id: i.id,
                count: i.count
            }))));
        }
    }, [order]);

    const addToOrder = useCallback((item, count) => {
        setOrder(order => {
            const newOrder = [];
            let added = false;
            for (const oldItem of order) {
                if (oldItem.id === item.id) {
                    added = true;
                    const newCount = oldItem.count + count;
                    if (newCount > 0) newOrder.push({ ...item, count: Math.min(newCount, 99) });
                } else newOrder.push({ ...oldItem });
            }
            if (!added && count > 0) {
                newOrder.push({ ...item, count: Math.min(count, 99) });
            }
            return newOrder;
        });
    }, []);

    return <>
        <OrderMenu updatedMenu={updatedMenu} onClickItem={addToOrder} order={order} />
        <Cart order={order} add={addToOrder} />
    </>;
};

export default OrderNow;
