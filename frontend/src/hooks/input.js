import { useState, useCallback } from 'react';

export const useNumberInput = (defaultValue, min = 0, max = 100) => {
    const [value, setValue] = useState(defaultValue);

    const setNumberValue = useCallback(e => {
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        setValue(newValue ? Math.min(max, Math.max(min, +newValue)) : '');
    }, [min, max]);

    return [value, setNumberValue];
};

export const useInput = defaultValue => {
    const [value, setValue] = useState(defaultValue);

    const setStringValue = useCallback(e => {
        setValue(e.target.value);
    }, []);

    return [value, setStringValue];
};

export const useCheckbox = defaultValue => {
    const [value, setValue] = useState(defaultValue);

    const setChecked = useCallback(e => {
        setValue(e.target.checked);
    }, []);

    return [value, setChecked];
};
