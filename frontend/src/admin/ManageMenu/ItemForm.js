import { useCheckbox, useInput } from 'hooks/input';
import React, { useCallback, useState } from 'react';
import { deleteItem, item } from 'services/admin';
import { Background, Button, CloseButton, Error, Input, Label, Model, Title } from './FormStyle';

const usePrice = defaultValue => {
    const [price, setPrice] = useState(defaultValue);

    const setPriceValue = useCallback(e => {
        setPrice(+e.target.value.replace(/[^0-9]/g, ''));
    }, []);

    return [price, setPriceValue];
};

const ItemForm = ({ data, closeForm, getData, menuId }) => {
    const [error, setError] = useState('');
    const [name, setName] = useInput(data?.name || '');
    const [description, setDescription] = useInput(data?.description || '');
    const [price, setPrice] = usePrice(data?.price || '');
    const [image, setImage] = useState(null);
    const [deleteImage, setDeleteImage] = useCheckbox(false);

    const onImageChange = useCallback(e => { setImage(e.target.files[0]); }, []);

    const submit = useCallback(async () => {
        setError('');
        const formData = new FormData();
        formData.append('image', image);
        formData.append('data', JSON.stringify({
            id: data ? data.id : undefined,
            name,
            description,
            price,
            menu_id: menuId
        }));
        if (deleteImage) formData.append('deleteImage', deleteImage);
        const res = await item(formData, !!data);
        if (res.status === 200 && res.success) {
            closeForm();
            getData();
        } else {
            setError(res.message);
        }
    }, [menuId, name, description, price, image, deleteImage, closeForm, getData, data]);

    const del = useCallback(async () => {
        const res = await deleteItem(data.id);
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
                <Title>{data ? 'Edit' : 'Create'} Item</Title>
                <Label>
                    Name<br />
                    <Input value={name} onChange={setName} />
                </Label>
                <Label>
                    Description<br />
                    <Input value={description} onChange={setDescription} />
                </Label>
                <Label>
                    Price<br />
                    <Input value={price} onChange={setPrice} />
                </Label>
                <Label>
                    Image<br />
                    <Input type='file' noPadding onChange={onImageChange} />
                    {data && <span>delete <Input type='checkbox' onChange={setDeleteImage} value={deleteImage} /></span>}
                </Label>
                <Button margin onClick={submit}>Submit</Button>
                {data && <Button margin onClick={del}>Delete</Button>}
                {error && <Error>{error}</Error>}
            </Model>
        </Background>
    );
};

export default ItemForm;
