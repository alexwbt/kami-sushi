import { useCheckbox, useInput, useNumberInput } from 'hooks/input';
import React, { useCallback, useState } from 'react';
import { deleteMenu, menu } from 'services/admin';
import { Background, Button, CloseButton, Error, Input, Label, Model, Title } from './FormStyle';

const MenuForm = ({ data, closeForm, getData }) => {
    const [error, setError] = useState('');
    const [name, setName] = useInput(data?.name || '');
    const [minCol, setMinCol] = useNumberInput(data?.min_column || '', 1, 5);
    const [maxCol, setMaxCol] = useNumberInput(data?.max_column || '', 1, 5);
    const [padding, setPadding] = useNumberInput(data?.padding || '', 0, 10);
    const [direction, setDirection] = useState(data?.direction);
    const [banner, setBanner] = useState(null);
    const [deleteBanner, setDeleteBanner] = useCheckbox(false);

    const switchDirection = useCallback(() => { setDirection(direction => !direction); }, []);
    const onImageChange = useCallback(e => { setBanner(e.target.files[0]); }, []);

    const submit = useCallback(async () => {
        setError('');
        const formData = new FormData();
        formData.append('image', banner);
        formData.append('data', JSON.stringify({
            id: data ? data.id : undefined,
            name,
            min_column: +minCol || undefined,
            max_column: +maxCol || undefined,
            padding: +padding || undefined,
            direction,
        }));
        if (deleteBanner) formData.append('deleteBanner', deleteBanner);
        const res = await menu(formData, !!data);
        if (res.status === 200 && res.success) {
            closeForm();
            getData();
        } else {
            setError(res.message);
        }
    }, [name, minCol, maxCol, padding, direction, banner, deleteBanner, closeForm, getData, data]);

    const del = useCallback(async () => {
        const res = await deleteMenu(data.id);
        if (res.status === 200 && res.success) {
            closeForm();
            getData();
        } else {
            setError(res.message);
        }
    }, [closeForm, getData, data.id]);

    return (
        <Background>
            <Model>
                <CloseButton onClick={closeForm} />
                <Title>{data ? 'Edit' : 'Create'} Menu</Title>
                <Label>
                    Name<br />
                    <Input value={name} onChange={setName} />
                </Label>
                <Label>
                    Column<br />
                    <Input size={1} placeholder={2} value={minCol} onChange={setMinCol} />
                    <span> - </span>
                    <Input size={1} placeholder={4} value={maxCol} onChange={setMaxCol} />
                </Label>
                <Label>
                    Padding<br />
                    <Input size={1} placeholder={5} value={padding} onChange={setPadding} />
                </Label>
                <Label>
                    Direction<br />
                    <Button onClick={switchDirection}>{direction ? 'Horizontal' : 'Vertical'}</Button>
                </Label>
                <Label>
                    Banner<br />
                    <Input type='file' noPadding onChange={onImageChange} />
                    {data && <span>delete <Input type='checkbox' onChange={setDeleteBanner} value={deleteBanner} /></span>}
                </Label>
                <Button margin onClick={submit}>Submit</Button>
                {data && <Button margin onClick={del}>Delete</Button>}
                {error && <Error>{error}</Error>}
            </Model>
        </Background>
    );
};

export default MenuForm;
